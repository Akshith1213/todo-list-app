import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: ${({ theme }) => theme.transitions.default};
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, select {
    font-family: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent + '40'};
    color: ${({ theme }) => theme.colors.text};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export default GlobalStyle;