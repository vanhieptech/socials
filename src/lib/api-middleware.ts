import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import { getToken } from 'next-auth/jwt';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export function withApiSecurity(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Apply rate limiting
    await new Promise((resolve) => apiLimiter(req, res, resolve));

    // Verify authentication
    const token = await getToken({ req });
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Set security headers
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:;"
    );

    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
} 