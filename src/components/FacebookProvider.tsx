import { FacebookProvider as ReactFacebookProvider } from 'react-facebook';
import { FACEBOOK_APP_ID } from '@/config/constants';

interface FacebookProviderProps {
  children: React.ReactNode;
}

const FacebookProvider: React.FC<FacebookProviderProps> = ({ children }) => {
  return (
    <ReactFacebookProvider appId={FACEBOOK_APP_ID}>
      {children}
    </ReactFacebookProvider>
  );
};

export default FacebookProvider; 