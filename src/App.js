import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import GlobalStyle from './styles/GlobalStyle';
import ViewSelector from './components/views/ViewSelector';
import ListView from './components/views/ListView';
import AddTodo from './components/AddTodo';
import ThemeToggle from './components/ThemeToggle';
import Statistics from './components/features/Statistics';

function App() {
  const [currentView, setCurrentView] = useState('active');

  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <AppContent currentView={currentView} setCurrentView={setCurrentView} />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppContent = ({ currentView, setCurrentView }) => {
  const { user, logout } = useAuth();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -10 }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!user ? (
        <Login />
      ) : (
        <AppContainer
          as={motion.div}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <GlobalStyle />
          <GlassBackground />
          <ContentWrapper>
            <Header as={motion.div} variants={itemVariants}>
              <Title>My Todo List</Title>
              <UserSection>
                <UserEmail>{user.email}</UserEmail>
                <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
              </UserSection>
              <ThemeToggle />
            </Header>
            
            <motion.div variants={itemVariants}>
              <Statistics />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <AddTodo />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ListView view={currentView} />
            </motion.div>
          </ContentWrapper>
        </AppContainer>
      )}
    </AnimatePresence>
  );
};

const GlassBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(10px);
  z-index: -1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const AppContainer = styled(motion.div)`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => `linear-gradient(135deg, 
    ${theme.colors.secondary}80, 
    ${theme.colors.secondary}40)`};
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border + '40'};
  overflow: hidden;
  
  @media (max-width: 850px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${({ theme }) => `linear-gradient(135deg, 
    ${theme.colors.secondary}90, 
    ${theme.colors.secondary}60)`};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid ${({ theme }) => theme.colors.border + '20'};
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.accent}, 
    #2ecc71
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
  
  &:hover {
    transform: scale(1.02);
    letter-spacing: 0;
  }
  
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

export default App;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const UserEmail = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  opacity: 0.8;
`;

const SignOutButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;
