import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <Container>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Title>Welcome to Todo App</Title>
        <LoginButton onClick={signInWithGoogle}>
          <FaGoogle /> Sign in with Google
        </LoginButton>
      </LoginCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;

export default Login;