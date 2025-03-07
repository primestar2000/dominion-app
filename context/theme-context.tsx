// context/ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  secondaryText: string;
  cardBackground: string;
  primary: string;
  accentLight: string;
  headerBackground: string;
  headerText: string;
}

interface ThemeContextType {
  theme: ThemeColors;
  themeType: ThemeType;
  toggleTheme: () => void;
}

const lightTheme: ThemeColors = {
  backgroundColor: '#F8F9FA',
  textColor: '#212529',
  secondaryText: '#6C757D',
  cardBackground: '#FFFFFF',
  primary: '#7D5A50',  // Warm brown for church theme
  accentLight: '#F3E9E2',  // Light warm tone
  headerBackground: '#FFFFFF',
  headerText: '#212529',
};

const darkTheme: ThemeColors = {
  backgroundColor: '#212529',
  textColor: '#F8F9FA',
  secondaryText: '#ADB5BD',
  cardBackground: '#343A40',
  primary: '#B08D7E',  // Lighter warm brown for dark mode
  accentLight: '#4A3C36',  // Dark warm tone
  headerBackground: '#343A40',
  headerText: '#F8F9FA',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(colorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    setThemeType(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  const toggleTheme = () => {
    setThemeType(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themeType === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};