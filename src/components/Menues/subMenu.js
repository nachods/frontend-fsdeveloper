import React from "react";
import styles from "../../pages/menues/MenuPage.module.css";

const SubMenu = (props) => {
  const { title, picture, desc, price, onAddToCart } = props;

  const handleAddToCart = () => {
    // Ejecutar la función pasada como prop
    onAddToCart({
      title,
      picture,
      desc,
      price: parseFloat(price.replace('$', '')), // Eliminar el signo de dólar para usar el precio como número
    });
  };

  return (
    <div className={styles.Menu}>
      <img className={styles.MenuImg} src={picture} alt="picture.png" />
      <div className={styles.subMenu}>
        <h4 className={styles.MenuTitle}>{title}</h4>
        <p className={styles.MenuDesc}>{desc}</p>
        <h5 className={styles.MenuPrice}>{price}</h5>
        <button className={styles.MenuButton} onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
