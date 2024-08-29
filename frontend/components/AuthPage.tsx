import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const [authType, setAuthType] = useState<'register' | 'login'>('register');
  const { user } = useAuth();

  if (user) {
    return <div>Welcome, {user.email}!</div>;
  }

  return (
    <div>
      {!selectedRole ? (
        <div>
          <h2>Choose your role:</h2>
          <button onClick={() => setSelectedRole('student')}>Student</button>
          <button onClick={() => setSelectedRole('teacher')}>Teacher</button>
        </div>
      ) : (
        <div>
          <h2>{authType === 'register' ? 'Register' : 'Login'} as {selectedRole}</h2>
          <AuthForm type={authType} role={selectedRole} />
          <p>
            {authType === 'register'
              ? 'Already have an account?'
              : "Don't have an account?"}
            <button onClick={() => setAuthType(authType === 'register' ? 'login' : 'register')}>
              {authType === 'register' ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;