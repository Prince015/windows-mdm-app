// components/Button.tsx
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    type?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className = '',
    htmlType = 'button',
    type = 'primary',
    disabled = false,
}) => {
    const baseStyles = 'rounded-md transition-all duration-150';

    const typeStyles = {
        primary: 'bg-primary text-white mt-2 px-4 py-3',
        secondary: 'bg-white text-black border border-border/10 mt-2 px-4 py-3',
        ghost: 'bgtransparent border px-2.5',
    };

    const combinedStyles = `${className}
    ${baseStyles}
    ${typeStyles[type] || ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `.trim();


    return (
        <button
            type={htmlType}
            onClick={onClick}
            className={combinedStyles}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
