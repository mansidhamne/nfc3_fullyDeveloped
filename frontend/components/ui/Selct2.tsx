import React from 'react';

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onChange, className = '', children }) => {
  return (
    <select value={value} onChange={onChange} className={`p-2 border rounded ${className}`}>
      {children}
    </select>
  );
};

export default Select;
