import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useTask } from '../../context/TaskContext';

const Statistics = () => {
  const { statistics } = useTask();

  return (
    <Container>
      <StatCard
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <StatIcon>
          <FaCheckCircle />
        </StatIcon>
        <StatInfo>
          <StatValue>{statistics.completed}</StatValue>
          <StatLabel>Completed Tasks</StatLabel>
        </StatInfo>
      </StatCard>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const StatIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text + '80'};
`;

export default Statistics;