import React from "react";
import "./input.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

const InputComponent: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) => {
  return (
    <div className="input-wrapper">
      <input
        className={`custom-input ${error ? "input-error" : ""}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputComponent;
