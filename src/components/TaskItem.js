const TaskContainer = styled.div`
  // ... existing styles ...
  background: ${({ $priority, theme }) => {
    // Use $priority instead of priority
    switch ($priority) {
      case 'high': return theme.colors.priorityHigh;
      case 'medium': return theme.colors.priorityMedium;
      default: return theme.colors.priorityLow;
    }
  }};
`;

const TaskText = styled.span`
  // ... existing styles ...
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  opacity: ${({ $completed }) => $completed ? 0.6 : 1};
`;

// In your TaskItem component, update the props:
<TaskContainer $priority={priority}>
  <TaskText $completed={completed}>
    {text}
  </TaskText>
</TaskContainer>