'use client';

import { useState } from 'react';
import FacebookProvider from '../components/FacebookProvider';
import FacebookLoginComponent from '../components/FacebookLogin';
import CommentPicker from '../components/CommentPicker';
import styled from 'styled-components';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);

  const handleFacebookLogin = (response: any) => {
    if (response) {
      setUserData(response);
    }
  };

  const handleError = (error: any) => {
    console.error('Facebook login error:', error);
    // Implement your error handling here
  };

  return (
    <FacebookProvider>
      <Container>
        {!userData ? (
          <FacebookLoginComponent 
            onLogin={handleFacebookLogin}
            onError={handleError}
          />
        ) : (
          <CommentPicker userData={userData} />
        )}
      </Container>
    </FacebookProvider>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f0f2f5;
`;
