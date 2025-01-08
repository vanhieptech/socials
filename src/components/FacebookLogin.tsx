import { LoginButton } from 'react-facebook';
import styled from 'styled-components';

interface FacebookLoginProps {
  onLogin: (response: any) => void;
  onError?: (error: any) => void;
}

const FacebookLoginComponent: React.FC<FacebookLoginProps> = ({ onLogin, onError }) => {
  return (
    <LoginContainer>
      <h1>Facebook Comment Picker</h1>
      <p>Login with Facebook to access your posts and comments</p>
      <LoginButton
        scope="public_profile,email,pages_read_engagement,pages_show_list"
        onError={onError}
        onSuccess={onLogin}
      >
        Login with Facebook
      </LoginButton>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #1877f2;
  }

  .facebook-login-button {
    background-color: #1877f2;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
      background-color: #166fe5;
    }
  }
`;

export default FacebookLoginComponent; 