import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isValid } from 'date-fns';
import { useTask } from '../../context/TaskContext';

const CalendarView = () => {
  const { tasks } = useTask();
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDay = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return isValid(taskDate) && format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  return (
    <Container>
      <CalendarHeader>
        <h2>{format(today, 'MMMM yyyy')}</h2>
      </CalendarHeader>
      <CalendarGrid>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {days.map(day => (
          <DayCell
            key={day.toString()}
            isToday={format(today, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')}
          >
            <DateNumber>{format(day, 'd')}</DateNumber>
            <TaskList>
              {getTasksForDay(day).map(task => (
                <TaskItem
                  key={task.id}
                  priority={task.priority}
                  whileHover={{ scale: 1.02 }}
                >
                  {task.text}
                </TaskItem>
              ))}
            </TaskList>
          </DayCell>
        ))}
      </CalendarGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const CalendarHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const DayCell = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.sm};
  min-height: 120px;
  border: 2px solid ${({ theme, isToday }) => 
    isToday ? theme.colors.accent : 'transparent'};
`;

const DateNumber = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TaskItem = styled(motion.div)`
  background: ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.danger + '20' :
    priority === 'medium' ? theme.colors.accent + '20' :
    theme.colors.success + '20'};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default CalendarView;