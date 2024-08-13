import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const LoginForm = () => {
  return (
    <div className={styles.gradientcontainer}>
      <form className={styles.contform}>
        <div className={styles.contlogo}>
          <img className={styles.logo} src={Logo} alt='logo'></img>
        </div>
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
        <button type='submit'>Iniciar Sesión</button>
        <p>
        ¿No tienes una cuenta? <Link className={styles.link} to="/">Registrate ahora</Link>
        </p>
        <div className={styles.contcontc}>
          <i className="bi bi-whatsapp"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </form>
    </div>
  );
}

export default LoginForm