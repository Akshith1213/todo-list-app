import React from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { useTask } from '../../context/TaskContext';
import TaskItem from '../task/TaskItem';

const ListView = ({ view }) => {
  const { tasks } = useTask();
  
  const filteredTasks = tasks.filter(task => 
    view === 'completed' ? task.completed : !task.completed
  );

  return (
    <Container>
      <AnimatePresence>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
      {filteredTasks.length === 0 && (
        <EmptyMessage>
          {view === 'completed' ? 'No completed tasks yet' : 'No active tasks'}
        </EmptyMessage>
      )}
    </Container>
  );
};

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