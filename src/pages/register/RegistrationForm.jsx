import React, { useState } from 'react';
import styles from './Registration.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { registerFetch } from '../../api/registerFetch';

const RegistrationForm = () => {
  /* 
  datos del formulario
   */
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
  });

  /* 
validacion de formulario
 */
  const [error, setError] = useState(null); //Estado de los msjs de error o correcto
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => { //Cambia los datos por los que manda el usuario
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* 
  obtener los datos del formulario de registro
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // data
    try {
      const res = await registerFetch(formData); // Enviar datos del formulario
      console.log(res);
      setError('');
      setSuccess(res.msg); // Msg proveniente del backend
    } catch (error) {
      console.log(error);
      setError(error.msg); // Msg proveniente del backend
      setSuccess('');
    }
  };



  return (
    <div className={styles.gradientcontainer}>
      <form className={styles.contform} onSubmit={handleSubmit}>
        <div className={styles.contlogo}>
          <img className={styles.logo} src={Logo} alt='logo'></img>
        </div>
        <input
          type="text"
          name="firstname"
          placeholder="Nombre"
          value={formData.firstname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          value={formData.lastname}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Telefóno"
          value={formData.phone}
          onChange={handleInputChange}
        />
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
        <button type='submit'>Registrarse</button>
        {success && <p className="alert alert-success">Registro Completado</p>}
        <p>
          ¿Ya tienes una cuenta? <Link className={styles.link} to="/login">Iniciar sesión</Link>
        </p>
        <div className={styles.contcontc}>
          <i className="bi bi-whatsapp"></i>
          <i className="bi bi-instagram"></i>
        </div>
      </form>
    </div>
  );
}
///Los i de whatsapp e instagram deberian de ser botones, pero como no hay redes en si de la pagina, no lo hice

export default RegistrationForm;