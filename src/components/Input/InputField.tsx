import React from 'react';
import './InputField.css';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor="input-field">{label}</label>
      <input
        type="text"
        id="input-field"
        className="input-field"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
