import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`p-4 bg-white shadow rounded-lg ${className}`} style={{ border: '1px solid #ddd' }}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => (
  <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '16px' }}>
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{children}</h3>
);

export const CardContent = ({ children }) => <div>{children}</div>;

export default Card;
