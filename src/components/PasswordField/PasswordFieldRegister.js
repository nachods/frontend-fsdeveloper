import React, { useState } from 'react';
import styles from './PasswordFieldRegister.module.css'; // Asegúrate de tener estilos para el componente

const PasswordField = ({ name, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.passwordWrapper}>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.passwordInput}
      />
      <button
        type="button"
        className={styles.toggleButton}
        onClick={togglePasswordVisibility}
      >
        <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
      </button>
    </div>
  );
};

export default PasswordField;
