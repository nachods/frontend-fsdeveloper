import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMePedidoFetch } from '../../api/pedidos/getMePedidoFetch'; // Importa la función para obtener el pedido
import { deletePedidoFetch } from '../../api/pedidos/deletePedidoFetch'; // Importa la función para eliminar el pedido
import AuthContext from '../../context/AuthContext';
import { Modal, Button } from 'react-bootstrap'; // Importa los componentes Modal y Button de react-bootstrap
import styles from './PayoutPage.module.css';

const PayoutPage = () => {
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState(null); // Aquí defines el estado para 'error'
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Obtén el ID del usuario desde el contexto
    const usuarioID = user._id;

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const result = await getMePedidoFetch(usuarioID);
                setPedido(result.pedido);
                setError(null); // Limpia el error si la llamada es exitosa
            } catch (error) {
                setError('Error al obtener el pedido'); // Establece el error si falla
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

    const handleDeletePedido = async () => {
        try {
            await deletePedidoFetch(usuarioID); // Llama a la función para eliminar el pedido
            setPedido(null); // Limpia el estado del pedido tras eliminarlo
        } catch (error) {
            console.error(error);
            setError(`Error al eliminar el pedido: ${error.message}`); // Establece el error si la eliminación falla
        }
    };

    const handleWhatsAppRedirect = () => {
        window.open('https://dm.wa.link/9ea8f3', '_blank'); // Abre el enlace en una nueva pestaña
    };

    // Si hay un error o no hay pedido, muestra un mensaje
    if (error || !pedido || pedido.productos.length === 0) {
        return (
            <div className={styles.container}>
                <h2>No hay pedido realizado</h2>
                <button className={styles.PayoutButton} onClick={handleGoBack}>Volver al Menú</button>
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <h1>Detalles del Pedido</h1>
                    <button onClick={handleDeletePedido}><i className="bi bi-trash3-fill"></i></button>
                </div>
                <div>
                    <h2>Pedido #{pedido._id}</h2>
                    <p>Estado: {pedido.estado}</p>
                    <ul>
                        {pedido.productos.map((producto, index) => (
                            <li key={index}>
                                <p>Producto: {producto.nombre} (x{producto.cantidad})</p>
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
                        <Button variant="success" onClick={handleWhatsAppRedirect}>
                            <i className="bi bi-whatsapp"></i> WhatsApp
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
