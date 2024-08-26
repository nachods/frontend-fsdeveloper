import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../../assets/images/logo.png';
import AuthContext from '../../context/AuthContext'; // Asegúrate de importar el contexto correcto

const LoginForm = () => {
  const { setUser, login } = useContext(AuthContext); // Usar login desde el contexto
  /* 
  datos del formulario
  */
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  /* 
  validacion de formulario
  */
  const [error, setError] = useState(null); // Estado de los msjs de error o correcto

  const handleInputChange = (e) => { // Cambia los datos estaticos por los que ingresa el usuario
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  /* 
  obtener los datos del formulario de login
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await login(formData); // Usa el método login del contexto

      if (accessToken) {
        setUser({
          firstname: 'Ignacio',
          lastname: 'De Simone',
          email: 'ignacio@test.com',
        });
      };

      setError('');
      navigate('/home'); // Navega a la página de inicio después del inicio de sesión
    } catch (error) {
      console.log(error);
      setError('Error de servidor');
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
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="alert alert-danger">{error}</p>}
        <button type='submit'>Iniciar Sesión</button>
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
