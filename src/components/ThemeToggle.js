import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

const ToggleButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.isDark ? '#f1c40f' : '#2c3e50'};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ThemeToggle;