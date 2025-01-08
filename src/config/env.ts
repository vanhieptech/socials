const requiredEnvVars = [
  'FACEBOOK_APP_ID',
  'FACEBOOK_APP_SECRET',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
] as const;

export function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

export const env = {
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID!,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET!,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
} as const; 