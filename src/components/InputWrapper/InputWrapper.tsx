import React, { InputHTMLAttributes } from 'react';
import './InputWrapper.css';

interface InputWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
  loading: boolean;
  label?: string;
  error?: string;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ loading, label, error, ...inputProps }) => {
  return (
    <div className="inputWrapper">
      {label && <label htmlFor={inputProps.id}>{label}</label>}
        <input
          {...inputProps}
          onFocus={(event) => {
            event.currentTarget.select();
          }}
        />
        {loading && <div className="loadingSpinner"></div>}
      {error && <div className="errorText">{error}</div>}
    </div>
  );
};

export default InputWrapper;
