import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthFormProps {
  type: 'register' | 'login';
  role?: 'student' | 'teacher';
}

const AuthForm: React.FC<AuthFormProps> = ({ type, role }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    ...(role === 'student' ? {
      uid: '',
      phoneNo: '',
      year: '',
      branch: '',
      leetcodeProfileUrl: '',
      githubProfileUrl: '',
    } : {}),
    ...(role === 'teacher' ? {
      teacherId: '',
    } : {}),
  });

  const { register, login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === 'register') {
        await register({ ...formData, role });
      } else {
        await login(formData.email, formData.password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      {type === 'register' && role === 'student' && (
        <>
          <input
            type="text"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            placeholder="UID"
            required
          />
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Branch"
            required
          />
          <input
            type="url"
            name="leetcodeProfileUrl"
            value={formData.leetcodeProfileUrl}
            onChange={handleChange}
            placeholder="LeetCode Profile URL"
          />
          <input
            type="url"
            name="githubProfileUrl"
            value={formData.githubProfileUrl}
            onChange={handleChange}
            placeholder="GitHub Profile URL"
          />
        </>
      )}
      {type === 'register' && role === 'teacher' && (
        <input
          type="text"
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          placeholder="Teacher ID"
          required
        />
      )}
      <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;