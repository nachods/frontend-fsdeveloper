import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.containerPrimary}>
                <h1 className={styles.title}>Sabores de Italia</h1>
            </div>
            <div className={styles.containerP}>
                <p>Bienvenido a Sabores de Italia, donde cada bocado es una celebración de la auténtica cocina italiana. Nuestra misión es ofrecerte las pizzas más deliciosas, elaboradas con ingredientes frescos y recetas tradicionales.</p>
            </div>
            <div className=''>
                testimonios que corren solos
            </div>
            <div className=''>
                boton de llevar a los menus
            </div>
            <div className=''>
                fotos del restaurant
            </div>
            <div className=''>
                ubicacion, horarios y contacto, reservar por wsp
            </div>
        </div>
    )
}

export default HomePage