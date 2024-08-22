import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../../assets/images/logo.png';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className={styles.gradientcontainer}>
      <form className={styles.contform} onSubmit={handleSubmit}>
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
          ¿No tienes una cuenta? <a className={styles.link} href="/">Registrate ahora</a>
        </p>
        <div className={styles.contcontc}>
          <i className="bi bi-whatsapp"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
