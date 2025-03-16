import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCheck, FaTag, FaFlag } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Remove format import from date-fns
import { useTheme } from '../context/ThemeContext';

const TodoList = ({ todos, onToggle, onDelete, onDragEnd, onSearch, onFilter }) => {
  const { isDark } = useTheme();
  return (
    <>
      <FilterContainer>
        <SearchInput 
          type="text" 
          placeholder="Search todos..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
        <Select onChange={(e) => onFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="high">High Priority</option>
        </Select>
      </FilterContainer>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence>
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <TodoItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TodoContent>
                          <TodoText completed={todo.completed}>{todo.text}</TodoText>
                          <TodoMeta>
                            {todo.priority && (
                              <PriorityTag priority={todo.priority}>
                                <FaFlag /> {todo.priority}
                              </PriorityTag>
                            )}
                            {todo.category && (
                              <CategoryTag>
                                <FaTag /> {todo.category}
                              </CategoryTag>
                            )}
                          </TodoMeta>
                        </TodoContent>
                        <ButtonGroup>
                          <IconButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onToggle(todo.id)}
                            completed={todo.completed}
                          >
                            <FaCheck />
                          </IconButton>
                          <IconButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDelete(todo.id)}
                            delete
                          >
                            <FaTrash />
                          </IconButton>
                        </ButtonGroup>
                      </TodoItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </AnimatePresence>
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent + '40'};
  }
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent + '40'};
  }
`;

const TodoContent = styled.div`
  flex: 1;
`;

const TodoMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text + '80'};
`;

const PriorityTag = styled(MetaItem)`
  color: ${props => 
    props.priority === 'high' ? '#e74c3c' : 
    props.priority === 'medium' ? '#f39c12' : 
    '#3498db'};
`;

const CategoryTag = styled(MetaItem)`
  background: ${({ theme }) => theme.colors.background};
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled(motion.li)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(motion.button)`
  border: none;
  background: ${(props) =>
    props.delete ? props.theme.colors.danger : 
    props.completed ? props.theme.colors.success : 
    props.theme.colors.accent};
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const TodoText = styled.span`
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  color: ${({ theme, completed }) => 
    completed ? theme.colors.text + '80' : theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
`;

export default TodoList;