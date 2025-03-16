import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    colors: {
      background: isDark ? '#1a1b1e' : '#f5f7fa',
      text: isDark ? '#ffffff' : '#2c3e50',
      primary: isDark ? '#4a90e2' : '#3498db',
      secondary: isDark ? '#27282b' : '#ffffff',
      accent: isDark ? '#4a90e2' : '#3498db',
      danger: isDark ? '#ff4d4d' : '#e74c3c',
      success: isDark ? '#34d399' : '#2ecc71',
      border: isDark ? '#27282b' : '#e1e1e1',
      gradient: isDark ? 
        'linear-gradient(135deg, #4a90e2 0%, #34d399 100%)' : 
        'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
      shadow: isDark ?
        '0 4px 20px rgba(0, 0, 0, 0.3)' :
        '0 4px 20px rgba(0, 0, 0, 0.1)',
      hoverShadow: isDark ?
        '0 8px 30px rgba(0, 0, 0, 0.4)' :
        '0 8px 30px rgba(0, 0, 0, 0.15)',
    },
    transitions: {
      default: 'all 0.3s ease',
      smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    animations: {
      fadeIn: 'fadeIn 0.5s ease',
      slideUp: 'slideUp 0.5s ease',
      bounce: 'bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      xl: '16px',
      round: '50%',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);