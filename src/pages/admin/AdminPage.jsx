import React from 'react';
import styles from './AdminPage.module.css';
import UserLoading from '../../components/Admin-Components/userLoading';
import MenuLoading from '../../components/Admin-Components/menuLoading';
import PedidoLoading from '../../components/Admin-Components/pedidoLoading';

const AdminPage = () => {
    return (
        <div className={styles.container}>
            <h1>Página de Administrador</h1>
            <UserLoading/>
            <MenuLoading/>
            <PedidoLoading/>
        </div>
    );
};

export default AdminPage;
