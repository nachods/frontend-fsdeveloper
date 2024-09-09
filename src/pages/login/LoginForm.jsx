import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../../assets/images/logo.png';
import AuthContext from '../../context/AuthContext';
import { loginFetch } from '../../api/loginFetch';
import PasswordField from '../../components/PasswordField/PasswordField'; // Importa el nuevo componente

const LoginForm = () => {
  const { setUser, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { access } = await loginFetch(formData);
      login(access);
      localStorage.setItem('access', access);

      if (access) {
        setUser({
          firstname: 'Ignacio',
          lastname: 'De Simone',
          email: 'nacho@test.static.com',
        });
      }

      setError('');
      navigate('/home');
    } catch (error) {
      console.log(error);
      setError(error.msg);
    }
  };

  return (
    <div className={styles.gradientcontainer}>
      <form className={styles.contform} onSubmit={handleSubmit}>
        <div className={styles.contlogo}>
          <img className={styles.logo} src={Logo} alt='logo' />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleInputChange}
        />
        <PasswordField
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="alert alert-danger">{error}</p>}
        <button type='submit' className={styles.contformButton}>Iniciar Sesión</button>
        <p>
          ¿No tienes una cuenta? <a className={styles.link} href="/">Regístrate ahora</a>
        </p>
        <div className={styles.contcontc}>
          <i className="bi bi-whatsapp"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
