import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Pizza from '../../assets/images/Pizza.png';
import CarouselComponent from '../../components/Carousel Testimonios/CarouselComponent';
import CarouselPhotos from '../../components/Carousel Fotos/CarouselPhotos';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/menu');
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerPrimary}>
        <h1 className={styles.title}>Sabores de Italia</h1>
        <img className={styles.imgPrimary} src={Pizza} alt="pizza.png" />
      </div>
      <div className={styles.containerP}>
        <p>
          Bienvenido a Sabores de Italia, donde cada bocado es una celebración
          de la auténtica cocina italiana. Nuestra misión es ofrecerte las
          pizzas más deliciosas, elaboradas con ingredientes frescos y recetas
          tradicionales.
        </p>
      </div>
      <div className={styles.containerCarousel}>
        <h4>Estos dicen nuestros clientes de nosotros</h4>
        <CarouselComponent />
      </div>
      <div className={styles.containerMenu}>
        <p>Conoce nuestro amplio menu</p>
        <button type='submit' onClick={handleSubmit}>Visita nuestro menú!</button>
      </div>
      <div className={styles.containerCarouselPhotos}><CarouselPhotos /></div>
      <div className={styles.containerInformation}>
        <div>
          <h3 className={styles.containerInformationTitle}>Nuestros horarios</h3>
          <h4 className={styles.containerInformationHours}>Jueves a Domingo</h4>
          <h4 className={styles.containerInformationHours}>19hs a 01hs</h4>
          <p className={styles.containerInformationDirecc}>Av. Freyre 3049</p>
          <button className={styles.containerButton}><i class="bi bi-whatsapp"></i>Haz tu pedido o reserva aqui</button>
        </div>
      </div>
      <div className={styles.containerFooter}>
        <p>®Sabores De Italia - 2024</p>
      </div>
    </div>
  );
};

export default HomePage;
