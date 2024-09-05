import React from "react";
import styles from "../../pages/menues/MenuPage.module.css";

const SubMenu = (props) => {
  return (
    <div className={styles.Menu}>
      <img className={styles.MenuImg} src={props.picture} alt="picture.png" />
      <div className={styles.subMenu}>
        <h4 className={styles.MenuTitle}>{props.title}</h4>
        <p className={styles.MenuDesc}>{props.desc}</p>
        <h5 className={styles.MenuPrice}>{props.price}</h5>
        <button className={styles.MenuButton}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
