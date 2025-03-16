import React from 'react';
import styled from 'styled-components';

const ViewSelector = ({ currentView, onViewChange }) => {
  return (
    <Container>
      <ViewButton
        $active={currentView === 'active'}
        onClick={() => onViewChange('active')}
      >
        Active
      </ViewButton>
      <ViewButton
        $active={currentView === 'completed'}
        onClick={() => onViewChange('completed')}
      >
        Completed
      </ViewButton>
      <PriorityContainer>
        <ViewButton
          $active={currentView === 'low'}
          onClick={() => onViewChange('low')}
          $priority="low"
        >
          Low
        </ViewButton>
        <ViewButton
          $active={currentView === 'medium'}
          onClick={() => onViewChange('medium')}
          $priority="medium"
        >
          Medium
        </ViewButton>
        <ViewButton
          $active={currentView === 'high'}
          onClick={() => onViewChange('high')}
          $priority="high"
        >
          High
        </ViewButton>
      </PriorityContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PriorityContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ $active, $priority, theme }) => {
    if ($active) {
      switch ($priority) {
        case 'high': return theme.colors.danger;
        case 'medium': return '#ff9800';
        case 'low': return '#4caf50';
        default: return theme.colors.accent;
      }
    }
    return theme.colors.secondary;
  }};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;

export default ViewSelector;