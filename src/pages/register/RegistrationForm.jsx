import React, { useState } from 'react';
import styles from './Registration.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { registerFetch } from '../../api/registerFetch';
import PasswordField from '../../components/PasswordField/PasswordField'; // Importa el componente

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const phoneRegex = /^[0-9]*$/;
      if (!phoneRegex.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerFetch(formData);
      console.log(res);
      setError('');
      setSuccess(res.msg);
    } catch (error) {
      console.log(error);
      setError(error.msg);
      setSuccess('');
    }
  };

  return (
    <div className={styles.gradientcontainer}>
      <form className={styles.contform} onSubmit={handleSubmit}>
        <div className={styles.contlogo}>
          <img className={styles.logo} src={Logo} alt='logo' />
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
          type="tel"
          name="phone"
          placeholder="Teléfono"
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
        <PasswordField
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="alert alert-danger">{error}</p>}
        <button type='submit' className={styles.contformButton}>Registrarse</button>
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
};

export default RegistrationForm;
