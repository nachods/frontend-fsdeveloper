import React from 'react';
import styles from './PayoutPage.module.css';

const PayoutPage = () => {
    return (
        <>
            <div className={styles.container}>
                <h3>Tu Pedido<i class="bi bi-cart-check-fill"></i></h3>
                <div className={styles.subContainer}>
                    <img src='foto.png'></img>
                    <p>Nombre</p>
                    <p>precio</p>
                </div>
                <div className={styles.subTotal}>
                    <p>suma de precios</p>
                </div>
            </div>
            <div className={styles.containerFooter}>
                <p>®Sabores De Italia - 2024</p>
            </div>
        </>
    )
}

export default PayoutPage