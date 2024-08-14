import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import DesignNav from '../../assets/images/DiseñoNavBar.png';

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

  return (
    //clase dinamica del primer div para saber cuando mostrarse, si es true muestra Visible, sino Hidden
    <div className={`${styles.NavBar} ${showNavbar ? styles.visible : styles.hidden}`}> 
      <div className={styles.navLeft}>
        <img src={DesignNav} alt='navBar.png' />
      </div>
      <div className={styles.navRight}>
        <button>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default NavBar;
