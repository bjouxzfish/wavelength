
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'opponent';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  let baseStyle = "px-4 py-2 rounded-lg text-lg shadow hover:shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 font-medium";
  
  if (variant === 'primary') {
    // Cosmic Indigo: Pink primary
    baseStyle += " bg-pink-600 hover:bg-pink-700 text-white focus:ring-pink-500";
  } else if (variant === 'secondary') {
    // Cosmic Indigo: Indigo secondary
    baseStyle += " bg-indigo-500 hover:bg-indigo-600 text-slate-100 focus:ring-indigo-400";
  } else if (variant === 'opponent') {
    // Cosmic Indigo: Teal opponent
    baseStyle += " bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-400 text-xl";
  }

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
