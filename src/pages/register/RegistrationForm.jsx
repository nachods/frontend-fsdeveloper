import React from 'react';
import styles from './Registration.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const RegistrationForm = () => {
  return (
    <div className={styles.gradientcontainer}>
      <div className={styles.contform}>
        <div className={styles.contlogo}>
          <img className={styles.logo} src={Logo} alt='logo'></img>
        </div>
        <input
          type="text"
          name="firstname"
          placeholder="Nombre"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
        />
        <input
          type="number"
          name="lastname"
          placeholder="Teléfono"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
        />
        <button>Registrarse</button>
        <p>
          ¿Ya tienes una cuenta? <Link className={styles.link} to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;