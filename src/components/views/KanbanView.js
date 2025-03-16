import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTask } from '../../context/TaskContext';

const KanbanView = () => {
  const { tasks, updateTask } = useTask();
  
  const columns = {
    todo: tasks.filter(t => !t.completed && !t.inProgress),
    inProgress: tasks.filter(t => !t.completed && t.inProgress),
    completed: tasks.filter(t => t.completed)
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const task = tasks.find(t => t.id.toString() === draggableId);

    updateTask(task.id, {
      completed: destination.droppableId === 'completed',
      inProgress: destination.droppableId === 'inProgress'
    });
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Column>
          <ColumnHeader>To Do</ColumnHeader>
          <Droppable droppableId="todo">
            {(provided) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.todo.map((task, index) => (
                  <KanbanTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Column>

        <Column>
          <ColumnHeader>In Progress</ColumnHeader>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.inProgress.map((task, index) => (
                  <KanbanTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Column>

        <Column>
          <ColumnHeader>Completed</ColumnHeader>
          <Droppable droppableId="completed">
            {(provided) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.completed.map((task, index) => (
                  <KanbanTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Column>
      </DragDropContext>
    </Container>
  );
};

const KanbanTask = ({ task, index }) => (
  <Draggable draggableId={task.id.toString()} index={index}>
    {(provided) => (
      <TaskCard
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        priority={task.priority}
      >
        <TaskTitle>{task.text}</TaskTitle>
        {task.tags && (
          <TagContainer>
            {task.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagContainer>
        )}
      </TaskCard>
    )}
  </Draggable>
);

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  height: calc(100vh - 200px);
  overflow-x: auto;
`;

const Column = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  min-width: 300px;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ColumnHeader = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.2rem;
`;

const TaskList = styled.div`
  min-height: 100px;
`;

const TaskCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-left: 4px solid ${({ theme, priority }) => 
    priority === 'high' ? theme.colors.danger :
    priority === 'medium' ? theme.colors.accent :
    theme.colors.success};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;

const TaskTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.accent + '20'};
  color: ${({ theme }) => theme.colors.accent};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
`;

export default KanbanView;