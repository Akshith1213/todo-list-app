import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const AddTodo = () => {
  const { addTask } = useTask();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask({
        text,
        priority,
        category
      });
      setText('');
      setPriority('low');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <MainInput
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <PrioritySelect
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </PrioritySelect>
        <CategoryInput
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <AddButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          <FaPlus />
        </AddButton>
      </InputGroup>
    </form>
  );
};

const Form = styled.form`
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const MainInput = styled.input`
  flex: 2;
  min-width: 200px;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PrioritySelect = styled.select`
  flex: 1;
  min-width: 130px;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryInput = styled.input`
  flex: 1;
  min-width: 120px;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const AddButton = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
`;

export default AddTodo;