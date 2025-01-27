import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`p-4 bg-white shadow-lg rounded-lg ${className}`} style={{ border: '1px solid #ddd' }}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={`border-b pb-2 mb-4 ${className}`} style={{ borderBottom: '1px solid #ddd' }}>
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-bold ${className}`} style={{ margin: 0 }}>
    {children}
  </h3>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default Card;
