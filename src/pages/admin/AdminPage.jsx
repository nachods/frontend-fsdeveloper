import React from 'react';
import styles from './AdminPage.module.css';
import UserLoading from '../../components/Admin-Components/userLoading';
import MenuLoading from '../../components/Admin-Components/menuLoading';

const AdminPage = () => {
    return (
        <div className={styles.container}>
            <h1>Página de Administrador</h1>
            <UserLoading/>
            <MenuLoading/>
            <div className={styles.containerPedidos}>
                <h4>Sección de Pedidos</h4>
                {/* Mostrar pedidos aquí */}
            </div>
        </div>
    );
};

export default AdminPage;
