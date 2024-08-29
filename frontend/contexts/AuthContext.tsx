"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<{ user: any; role: string }>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem('user'); // Remove invalid data from localStorage
      }
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
        console.log('Login data:', { email, password });
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { user, role } = response.data;
  
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role); // Store role in localStorage or state
  
      return { user, role }; // Return the user and role
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };
  
  

  const register = async (userData: any) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};