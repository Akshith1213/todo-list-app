import React from 'react';
import styled from 'styled-components';
// Removed unused motion import

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
      <ViewButton
        $active={currentView === 'all'}
        onClick={() => onViewChange('all')}
      >
        All
      </ViewButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ViewButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ $active, theme }) => 
    $active ? theme.colors.accent : theme.colors.secondary};
  color: ${({ $active, theme }) => 
    $active ? '#fff' : theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;

export default ViewSelector;