import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply theme to body and html elements
    const root = document.documentElement;
    const body = document.body;

    // Set CSS variables for theme colors
    root.style.setProperty('--background-color', isDarkMode ? '#121212' : '#f5f5f5');
    root.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#000000');
    root.style.setProperty('--primary-color', '#ff6b6b');
    root.style.setProperty('--secondary-color', isDarkMode ? '#2d2d2d' : '#ffffff');
    root.style.setProperty('--card-background', isDarkMode ? '#1a1a1a' : '#ffffff');
    root.style.setProperty('--border-color', isDarkMode ? '#333333' : '#e0e0e0');
    root.style.setProperty('--hover-color', isDarkMode ? '#ff5252' : '#ff6b6b');
    root.style.setProperty('--shadow-color', isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--gradient-start', isDarkMode ? '#121212' : '#f5f5f5');
    root.style.setProperty('--gradient-end', isDarkMode ? '#2d2d2d' : '#ffffff');

    // Apply base styles
    body.style.backgroundColor = 'var(--background-color)';
    body.style.color = 'var(--text-color)';
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    // Add smooth transition to all elements
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.5s ease, 
                   color 0.5s ease, 
                   border-color 0.5s ease, 
                   box-shadow 0.5s ease,
                   transform 0.5s ease;
      }

      .theme-transition {
        transition: all 0.5s ease;
      }

      .theme-transition * {
        transition: all 0.5s ease;
      }
    `;
    document.head.appendChild(style);

    // Add theme class to body for global transitions
    body.classList.add('theme-transition');

    return () => {
      document.head.removeChild(style);
      body.classList.remove('theme-transition');
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      
      // Add transition class to body
      document.body.classList.add('theme-transition');
      
      // Remove transition class after animation
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 500);
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 