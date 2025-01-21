import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "danger" | "default";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "default",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    default: "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-300",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;