import React, { useEffect, useState } from 'react';
import styles from './MenuPage.module.css';
import SubMenu from '../../components/Menues/subMenu';
import { getAllMenus } from '../../api/adminMenus/getAllMenusFetch';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await getAllMenus();
                setMenus(data);
            } catch (error) {
                setError('Error en la carga de los menús');
            }
        };

        fetchMenus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    // Filtra los menús que están activos
    const activeMenus = menus.filter(menu => menu.estado);

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <h1>Selecciona el menú que más desees!</h1>
                <button onClick={handleSubmit}><i className="bi bi-house"></i></button>
            </div>
            <div className={styles.containerMenu}>
                {activeMenus.length > 0 ? (
                    activeMenus.map((menu) => (
                        <SubMenu
                            key={menu.nombre}
                            title={menu.nombre}
                            picture={`http://localhost:3977/${menu.image}`}
                            desc={menu.detalle}
                            price={`$${menu.precio}`}
                        />
                    ))
                ) : (
                    <p>No hay menús para mostrar</p>
                )}
                {error && <p>{error}</p>}
            </div>
            <div className={styles.containerFooter}>
                <p>®Sabores De Italia - 2024</p>
            </div>
        </div>
    );
};

export default MenuPage;
