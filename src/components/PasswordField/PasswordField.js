import React, { useState } from 'react';
import styles from './PasswordField.module.css'; // Importa los estilos correspondientes

const PasswordField = ({ name, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className={styles.passwordFieldContainer}>
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
                onClick={togglePasswordVisibility}
                className={styles.toggleButton}
            >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
        </div>
    );
};

export default PasswordField;
