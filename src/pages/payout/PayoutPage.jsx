import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMePedidoFetch } from '../../api/pedidos/getMePedidoFetch'; // Importa la función para obtener el pedido
import AuthContext from '../../context/AuthContext';
import { Modal, Button } from 'react-bootstrap'; // Importa los componentes Modal y Button de react-bootstrap
import styles from './PayoutPage.module.css'

const PayoutPage = () => {
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Obtén el ID del usuario desde el contexto o de alguna otra fuente
    const usuarioID = user._id;

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const result = await getMePedidoFetch(usuarioID);
                setPedido(result.pedido);
                setError(null);
            } catch (error) {
                setError('Error al obtener el pedido');
                console.error(error);
            }
        };

        fetchPedido();
    }, [usuarioID]);

    const handlePago = () => {
        // Muestra el modal después de hacer clic en el botón de pago
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleGoBack = () => {
        navigate('/menu'); // Redirige a la página del menú o a otra página si es necesario
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!pedido) {
        return <p>Cargando pedido...</p>;
    }

    return (
        <>
            <div className={styles.container}>
                <h1>Detalles del Pedido</h1>
                <div>
                    <h2>Pedido #{pedido._id}</h2>
                    <p>Estado: {pedido.estado}</p>
                    <ul>
                        {pedido.productos.map((producto, index) => (
                            <li key={index}>
                                <p>Producto: {producto.nombre} </p>
                                <p>Cantidad: {producto.cantidad}</p>
                                <p>Precio por Unidad: ${producto.precio}</p>
                            </li>
                        ))}
                    </ul>
                    <p className={styles.textTotal}>Total: ${pedido.total}</p>
                </div>
                <button className={styles.PayoutButton} onClick={handlePago}>Pagar</button>
                <button className={styles.PayoutButton} onClick={handleGoBack}>Volver al Menú</button>

                {/* Modal para mostrar el mensaje de confirmación */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmación de Pago</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        El equipo de Sabores de Italia se comunicará con usted enseguida para concretar el pago.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className={styles.containerFooter}>
                <p>®Sabores De Italia - 2024</p>
            </div>
        </>
    );
};

export default PayoutPage;
