import React from "react";
import styles from "./CarouselComponent.module.css";
import SubCarousel from "../Carousel Testimonios/subCarousel"; // Importa el componente correctamente

const CarouselComponent = () => {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        <SubCarousel
          nombre={"Erika"}
          msj={"¡Son las mejores pizzas que probé de la ciudad!"}
        />
        <div className={styles.carouselItem}>
          <SubCarousel
            nombre={"Cristian"}
            msj={"Son especiales en hacer la masa de la pizza ¡Son un éxito!"}
          />
        </div>
        <div className={styles.carouselItem}>
          <SubCarousel
            nombre={"Ludmila"}
            msj={
              "La primera vez no confiaba, pero ahora no los cambio por nada"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
