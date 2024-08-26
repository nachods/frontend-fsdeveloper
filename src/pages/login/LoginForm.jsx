import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../../assets/images/logo.png';
import AuthContext from '../../context/AuthContext'; // Asegúrate de importar el contexto correcto
import { loginFetch } from '../../api/loginFetch';

const LoginForm = () => {
  const { setUser, login } = useContext(AuthContext); // Usar login desde el contexto
  /* 
  Datos del formulario
  */
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  /* 
  Validación de formulario
  */
  const [error, setError] = useState(null); // Estado de los mensajes de error o correcto

  const handleInputChange = (e) => { // Cambia los datos estáticos por los que ingresa el usuario
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Navigate = useNavigate(); // Usar useNavigate para redirigir

  /* 
  Obtener los datos del formulario de login
  */
	const handleSubmit = async (e) => {
		e.preventDefault(); //evitamos recarga de pag
		
		try{
			const { access } = await loginFetch(formData); //llamo a la funcion, donde le mando los datos, ademas de extraer el token
			login(access); //funcion getme que mantiene la sesion abierta
			localStorage.setItem('access', access); //hacemos esto para no perder el token al refrescar la pagina

			if(access){ //si hay acceso...
				setUser({
					firstname: 'Ignacio',
					lastname: 'De Simone',
					email: 'nacho@test.static.com',
				});
			};

			setError('');
			Navigate('/home'); //envio al usuario al home
		}catch(error){
			console.log(error);
			setError('Error del servidor');
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
