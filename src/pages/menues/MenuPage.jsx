import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuPage.module.css';
import SubMenu from '../../components/Menues/subMenu';
import piz1 from '../../assets/images/Pizza1M.jpeg';
import piz2 from '../../assets/images/Pizza2M.jpeg';
import piz3 from '../../assets/images/Pizza3M.jpeg';
import piz4 from '../../assets/images/Pizza4M.jpeg';

const MenuPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home');
    };
    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <h1>Selecciona el menú que mas desees!</h1>
                <button onClick={handleSubmit}><i class="bi bi-house"></i></button>
            </div>
            <div className={styles.containerMenu}>
                <SubMenu title='Pizza Margherita Premium'
                    picture={piz1}
                    desc='Tomate San Marzano, mozzarella de búfala, albahaca fresca, y aceite de oliva extra virgen.'
                    price='$10,500'
                />
                <SubMenu title='Pizza Cuatro Quesos Especial'
                    picture={piz2}
                    desc='Mezcla de mozzarella de búfala, gorgonzola, queso de cabra, y parmesano añejo.'
                    price='$12,000'
                />
                <SubMenu title='Pizza Prosciutto e Rucola Gourmet'
                    picture={piz3}
                    desc='Jamón ibérico, rúcula orgánica, mozzarella de búfala, y láminas de parmesano.'
                    price='$11,800'
                />
                <SubMenu title='Pizza Diavola Picante'
                    picture={piz4}
                    desc='Salsa de tomate artesanal, mozzarella ahumada, salame calabrés picante, y aceite de chile.'
                    price='$11,200'
                />
            </div>
            <div className={styles.containerFooter}>
                <p>®Sabores De Italia - 2024</p>
            </div>
        </div>
    )
}

export default MenuPage