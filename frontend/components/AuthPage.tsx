import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const [authType, setAuthType] = useState<'register' | 'login'>('register');
  const { user } = useAuth();

  if (user) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Welcome, {user.email}!</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {!selectedRole ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Choose your role:</h2>
            <div className="space-x-4">
              <button 
                onClick={() => setSelectedRole('student')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Student
              </button>
              <button 
                onClick={() => setSelectedRole('teacher')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Teacher
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">
              {authType === 'register' ? 'Register' : 'Login'} as {selectedRole}
            </h2>
            <AuthForm type={authType} role={selectedRole} />
            <p className="text-center mt-4">
              {authType === 'register' ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setAuthType(authType === 'register' ? 'login' : 'register')}
                className="ml-2 text-blue-500 hover:underline focus:outline-none"
              >
                {authType === 'register' ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
