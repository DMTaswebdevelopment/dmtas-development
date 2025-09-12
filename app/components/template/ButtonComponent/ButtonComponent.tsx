import React, { ReactNode, MouseEvent } from "react";

interface ButtonComponentProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  onClick,
  leftIcon,
  rightIcon,
  className = "",
  bgColor,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className={`${bgColor || ""} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {leftIcon} {/* Left Icon */}
      {children}
      {rightIcon} {/* Right Icon */}
    </button>
  );
};

export default ButtonComponent;
