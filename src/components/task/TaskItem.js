import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { useTask } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTask();

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      priority={task.priority}
    >
      <MainContent>
        <TaskHeader>
          <TaskWrapper>
            <PriorityDot priority={task.priority} />
            <div>
              <TaskText completed={task.completed}>{task.text}</TaskText>
              {task.category && <CategoryTag>{task.category}</CategoryTag>}
            </div>
          </TaskWrapper>
          <ButtonGroup>
            <IconButton
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateTask(task.id, { completed: !task.completed })}
              variant="complete"
              completed={task.completed}
            >
              <FaCheck />
            </IconButton>
            <IconButton
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => deleteTask(task.id)}
              variant="delete"
            >
              <FaTrash />
            </IconButton>
          </ButtonGroup>
        </TaskHeader>
      </MainContent>
    </Container>
  );
};

// Add this new styled component
const CategoryTag = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  padding: 2px 8px;
  margin-left: 8px;
  background: ${({ theme }) => theme.colors.accent + '20'};
  color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const Container = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  border-left: 4px solid ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.danger :
    priority === 'medium' ? '#ff9800' :  // Orange for medium
    '#4caf50'};  // Green for low
  box-shadow: 0 2px 8px ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.danger + '20' :
    priority === 'medium' ? '#ff9800' + '20' :
    '#4caf50' + '20'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme, priority }) => 
      priority === 'high' ? theme.colors.danger + '30' :
      priority === 'medium' ? '#ff9800' + '30' :
      '#4caf50' + '30'};
  }
`;

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriorityDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.danger :
    priority === 'medium' ? '#ff9800' :
    '#4caf50'};
  box-shadow: 0 0 8px ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.danger + '60' :
    priority === 'medium' ? '#ff9800' + '60' :
    '#4caf50' + '60'};
`;

const MainContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TaskText = styled.span`
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  color: ${({ theme, completed }) => completed ? theme.colors.text + '80' : theme.colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const IconButton = styled(motion.button)`
  background: ${({ theme, variant, completed }) => 
    variant === 'complete' 
      ? completed 
        ? theme.colors.success + '60'  // Increased opacity for completed state
        : 'transparent'
      : variant === 'delete'
      ? 'transparent'
      : 'transparent'
  };
  border: 2px solid ${({ theme, variant }) => 
    variant === 'complete'
      ? theme.colors.success
      : variant === 'delete'
      ? theme.colors.danger
      : theme.colors.border
  };
  color: ${({ theme, variant, completed }) => 
    variant === 'complete'
      ? completed
        ? theme.colors.success
        : theme.colors.success
      : variant === 'delete'
      ? theme.colors.danger
      : theme.colors.text
  };
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'complete'
        ? theme.colors.success + '30'  // Increased hover opacity
        : variant === 'delete'
        ? theme.colors.danger + '30'   // Increased hover opacity
        : theme.colors.accent + '30'
    };
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: ${({ variant }) => 
      variant === 'complete' ? 'rotate(360deg)' : 'scale(1.1)'};
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TimeSpent = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.accent + '20'};
  color: ${({ theme }) => theme.colors.accent};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
`;

const SubtaskToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    text-decoration: underline;
  }
`;

const SubtaskSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Subtask = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SubtaskForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SubtaskInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default TaskItem;