import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.png';
import AuthContext from '../../context/AuthContext';

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(true); //Visible o no el navbar, comienza en true para que se muestre cuando carga la pagina
  const [lastScrollY, setLastScrollY] = useState(0); //Alamacena la ultima posicion 'Y' de la pantalla del usuario

  const handleScroll = () => { //Se ejecuta cuando hay un scroll
    if (window.scrollY > lastScrollY) {
      // Si el usuario está scrolleando hacia abajo, oculta el Navbar
      setShowNavbar(false); //Cambia estado de useState
    } else {
      // Si el usuario está scrolleando hacia arriba, muestra el Navbar
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY); //Actualiza la ultima ubicacion vertical registrada
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); //cada vez que hay scroll se ejecuta el evento

    return () => {
      window.removeEventListener('scroll', handleScroll); //cada vez que termina lo borra para evitar problemas
    };
  }, [lastScrollY]); //el lastScrollY, nos dice que solo se ejecutara si el mismo 'lastScrollY' cambia 

  const navigate = useNavigate(); // Hook para redirigir al usuario

  const { user, logout } = useContext(AuthContext);
  
  const handleAdmin = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    navigate('/admin'); // Redirige al usuario a la página de inicio
  };
  
  const handlePayout = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    navigate('/payout'); // Redirige al usuario a la página de inicio
  };
  const handleHome = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    navigate('/home'); // Redirige al usuario a la página de inicio
  };

  return (
    //clase dinamica del primer div para saber cuando mostrarse, si es true muestra Visible, sino Hidden
    <div className={`${styles.NavBar} ${showNavbar ? styles.visible : styles.hidden}`}> 
      <div className={styles.navLeft}>
        <img src={Logo} alt='navBar.png' onClick={handleHome}/>
      </div>
      <div className={styles.navRight}>
        {user.admin && <button className={styles.carrito} onClick={handleAdmin}><i class="bi bi-person-check-fill"></i></button> }
        <button className={styles.carrito} onClick={handlePayout}><i class="bi bi-cart"></i></button>
        <button className={styles.closeSession} onClick={logout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default NavBar;
