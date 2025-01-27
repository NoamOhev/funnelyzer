import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 rounded w-full ${className}`}
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '8px',
        width: '100%',
      }}
    />
  );
};

export default Input; // וודא שהשורה הזו קיימת
