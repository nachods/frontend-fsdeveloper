import React from 'react';
import styles from './AdminPage.module.css';
import UserLoading from '../../components/Admin-Components/userLoading';

const AdminPage = () => {
    return (
        <div className={styles.container}>
            <h1>Página de Administrador</h1>
            <UserLoading/>
            
            <div className={styles.containerMenu}>
                <h4>Sección de Menús</h4>
                <input 
                    type="text" 
                    placeholder="Buscar menús..." 
                />
                {/* Mostrar menús aquí */}
            </div>

            <div className={styles.containerPedidos}>
                <h4>Sección de Pedidos</h4>
                {/* Mostrar pedidos aquí */}
            </div>
        </div>
    );
};

export default AdminPage;
