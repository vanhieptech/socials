import { useState, useEffect } from 'react';
import { useFacebook } from 'react-facebook';
import styled from 'styled-components';
import { SecureFacebookClient } from '@/lib/facebook-client';

interface CommentPickerProps {
  userData: any;
}

interface FacebookApiResponse {
  data: any[];
}

const CommentPicker: React.FC<CommentPickerProps> = ({ userData }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { api } = useFacebook();
  const fbClient = SecureFacebookClient.getInstance();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const secureApiCall = async (endpoint: string, params: any) => {
    try {
      const token = await fbClient.getSecureToken(userData.id);
      if (!token) {
        throw new Error('No valid token found');
      }

      const response = await api?.api(endpoint, {
        ...params,
        access_token: token
      });

      return response;
    } catch (error) {
      console.error('Secure API call failed:', error);
      throw error;
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await secureApiCall('/me/posts', {
        fields: 'id,message,created_time',
      }) as FacebookApiResponse;
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchComments = async (postId: string) => {
    setLoading(true);
    try {
      const response = await api?.api(`/${postId}/comments`, {
        fields: 'id,message,from',
      } as any) as FacebookApiResponse;
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

  const handlePostSelect = (postId: string) => {
    setSelectedPost(postId);
    fetchComments(postId);
  };

  return (
    <Container>
      <UserInfo>
        <img src={userData.picture?.data?.url} alt={userData.name} />
        <h2>Welcome, {userData.name}!</h2>
      </UserInfo>

      <Section>
        <h3>Select a Post</h3>
        <PostList>
          {posts.map((post: any) => (
            <PostItem
              key={post.id}
              selected={selectedPost === post.id}
              onClick={() => handlePostSelect(post.id)}
            >
              {post.message || 'No message'}
              <small>{new Date(post.created_time).toLocaleDateString()}</small>
            </PostItem>
          ))}
        </PostList>
      </Section>

      {selectedPost && (
        <Section>
          <h3>Comments</h3>
          {loading ? (
            <Loading>Loading comments...</Loading>
          ) : (
            <CommentList>
              {comments.map((comment: any) => (
                <CommentItem key={comment.id}>
                  <p>{comment.message}</p>
                  <small>By: {comment.from.name}</small>
                </CommentItem>
              ))}
            </CommentList>
          )}
        </Section>
      )}
    </Container>
  );
};

const Container = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.selected ? '#e7f3ff' : '#ffffff'};
  
  &:hover {
    background: #f0f2f5;
  }
  
  small {
    display: block;
    color: #65676b;
    margin-top: 0.5rem;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  small {
    display: block;
    color: #65676b;
    margin-top: 0.5rem;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #65676b;
`;

export default CommentPicker;