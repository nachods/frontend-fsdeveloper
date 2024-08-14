import React from "react";
import styles from "./CarouselComponent.module.css";

const SubCarousel = (props) => {
  return (
    <div className={styles.carouselItem}>
      <div>
        <h5>{props.nombre}</h5>
        <p>{props.msj}</p>
      </div>
    </div>
  );
};

export default SubCarousel;
