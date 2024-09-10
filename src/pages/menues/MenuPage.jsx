import React, { useContext, useEffect, useState } from 'react';
import styles from './MenuPage.module.css';
import SubMenu from '../../components/Menues/subMenu';
import { getAllMenus } from '../../api/adminMenus/getAllMenusFetch';
import { createPedidoFetch } from '../../api/pedidos/createPedidoFetch'; // Importa tu función aquí
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const MenuPage = () => {
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]); // Estado para el carrito
    const [searchMenus, setSearchMenus] = useState(""); // Buscador
    const [filterActive, setFilterActive] = useState("all"); // Filtrado
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await getAllMenus();
                setMenus(data);
                setError(null);
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

    const handleAddToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, cantidad: 1 }];
            }
        });
    };

    const handleProceedToCheckout = async () => {
        const usuarioId = user._id; // Cambia esto al ID del usuario logueado
        try {
            const productos = cart.map(item => ({
                menuItemId: item._id,
                cantidad: item.cantidad
            }));

            const result = await createPedidoFetch(usuarioId, productos);
            console.log('Pedido guardado:', result);
            navigate('/payout');
        } catch (error) {
            console.error('Error al guardar el pedido:', error);
        }
    };

    const activeMenus = menus.filter(menu => menu.estado);

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);
    };

    // Filtrar por categoría primero
    const filteredByCategory = activeMenus.filter(menu =>
        filterActive === "all" || menu.categoria === filterActive
    );

    // Luego, filtrar por nombre en los resultados ya filtrados por categoría
    const filteredCategorias = filteredByCategory.filter(menu =>
        menu.nombre.toLowerCase().includes(searchMenus.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <h1>Selecciona el menú que más desees!</h1>
                <button onClick={handleSubmit}><i className="bi bi-house"></i></button>
            </div>
            <div className={styles.cartContainer}>
                <h3 className={styles.cartTextTitle}>Carrito</h3>
                <ul>
                    {cart.map((item) => (
                        <li key={item._id}>
                            <span className={styles.cartText}>
                                {item.title} (x{item.cantidad}) - ${item.precio * item.cantidad}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className={styles.cartText}>Total: ${getTotal()}</p>
                <button className={styles.cartButton} onClick={handleProceedToCheckout}>Proceder a pagar</button>
            </div>
            <div className={styles.containerMenu}>
                <input
                    className={styles.inputSearch}
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchMenus}
                    onChange={(e) => setSearchMenus(e.target.value)}
                />
                <select
                    className={styles.inputSearch}
                    value={filterActive}
                    onChange={(e) => setFilterActive(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Empanadas">Empanadas</option>
                </select>
            </div>
            <div className={styles.containerMenu}>
                {filteredCategorias.length > 0 ? (
                    filteredCategorias.map((menu) => (
                        <SubMenu
                            key={menu._id}
                            title={menu.nombre}
                            picture={`https://proyectfinal-backend-fsdeveloper-production.up.railway.app/${menu.image}`}
                            desc={menu.detalle}
                            price={`$${menu.precio}`}
                            onAddToCart={() => handleAddToCart({
                                _id: menu._id,
                                title: menu.nombre,
                                precio: menu.precio
                            })}
                        />
                    ))
                ) : (
                    <p>No hay menús para mostrar</p>
                )}
            </div>
            <div className={styles.containerFooter}>
                <p>®Sabores De Italia - 2024</p>
            </div>
        </div>
    );
};

export default MenuPage;
