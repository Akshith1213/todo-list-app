import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { IoSearchOutline } from 'react-icons/io5'; // Changed to modern iOS-style icon
import { useTask } from '../../context/TaskContext';
import TaskItem from '../task/TaskItem';

const ListView = ({ view }) => {
  const { tasks } = useTask();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTasks = tasks.filter(task => {
    const matchesView = view === 'completed' ? task.completed : !task.completed;
    const matchesSearch = 
      task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesView && matchesSearch;
  });

  return (
    <Container>
      <SearchContainer>
        <SearchIcon />
        <SearchBar
          type="text"
          placeholder="Search tasks or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <AnimatePresence>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
      {filteredTasks.length === 0 && (
        <EmptyMessage>
          {searchTerm 
            ? 'No matching tasks found' 
            : view === 'completed' 
              ? 'No completed tasks yet' 
              : 'No active tasks'}
        </EmptyMessage>
      )}
    </Container>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem 1.2rem 1rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text + '50'};
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const SearchIcon = styled(IoSearchOutline)`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text + '50'};
  font-size: 1.2rem;
  z-index: 1;
  transition: color 0.3s ease;

  ${SearchContainer}:focus-within & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: 2rem; // Add spacing between AddTodo and ListView
  padding-top: 1rem; // Additional padding for better separation
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text + '80'};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export default ListView;