import React, { useEffect, useState, useContext } from "react";
import styles from "../../pages/admin/AdminPage.module.css";
import { getAllPedidos } from "../../api/adminPedidos/getAllPedidosFetch";
import { updateStatusPedidoFetch } from "../../api/adminPedidos/updateStatusPedidoFetch";
import { deletePedidoFetch } from '../../api/pedidos/deletePedidoFetch';
import AuthContext from '../../context/AuthContext';

const PedidoLoading = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null); // Manejar errores
  const [searchPedidos, setSearchPedidos] = useState(""); // Buscador
  const [filterActive, setFilterActive] = useState("all"); // Filtrado
  const { user } = useContext(AuthContext);

  const usuarioID = user._id;

  useEffect(() => {
    // Usar la función importada, cuando se carga la página
    const fetchPedido = async () => {
      try {
        const data = await getAllPedidos();
        setPedidos(data);
      } catch (error) {
        setError("Error al cargar los pedidos");
      }
    };

    fetchPedido();
  }, []);

  const filteredPedidos = pedidos.filter(
    (pedido) =>
      (filterActive === "all" || pedido.estado === filterActive) &&
      pedido.usuarioNombre.toLowerCase().includes(searchPedidos.toLowerCase())
  );

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      // Llamar a la función de actualización de estado del pedido
      await updateStatusPedidoFetch(id, nuevoEstado);
  
      // Actualizar el estado del pedido en el frontend
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido._id === id ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );
    } catch (error) {
      console.error(error);
      setError(`Error al actualizar el estado del pedido: ${error.message}`);
    }
  };
  

  const handleDeletePedido = async (usuarioId) => {
    try {
      await deletePedidoFetch(usuarioId); // Llama a la función para eliminar el pedido
      // Limpia el estado del pedido tras eliminarlo
      setPedidos((prevPedidos) => prevPedidos.filter(pedido => pedido.usuarioId !== usuarioId));
    } catch (error) {
      console.error(error);
      setError(`Error al eliminar el pedido: ${error.message}`); // Establece el error si la eliminación falla
    }
  };

  return (
    <div className={styles.containerPedidos}>
      <h4 className={styles.titlePedidos}>Sección de Pedidos</h4>
      <input
        className={styles.inputPedidos}
        type="text"
        placeholder="Buscar pedidos por nombre de usuario"
        value={searchPedidos}
        onChange={(e) => setSearchPedidos(e.target.value)}
      />
      <select
        className={styles.inputPedidos}
        value={filterActive}
        onChange={(e) => setFilterActive(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="Pago Pendiente">Pago Pendiente</option>
        <option value="En proceso">En proceso</option>
        <option value="Completado">Completado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <ul>
        {filteredPedidos.length > 0 ? (
          filteredPedidos.map((pedido) => (
            <li key={pedido._id} className={styles.liPedidos}>
              <p><strong>Usuario:</strong> {pedido.usuarioNombre}</p>
              <ul>
                {pedido.productos.map((producto) => (
                  <li key={producto.menuItemId}>
                    {producto.nombre} - Cantidad: {producto.cantidad}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ${pedido.total}</p>
              <div>
                <button
                  className={pedido.estado === "Pago Pendiente" ? styles.buttonsuccessPedidos : styles.buttondangerPedidos}
                  onClick={() => handleEstadoChange(pedido._id, "Pago Pendiente")}
                >
                  Pago Pendiente
                </button>
                <button
                  className={pedido.estado === "En proceso" ? styles.buttonsuccessPedidos : styles.buttondangerPedidos}
                  onClick={() => handleEstadoChange(pedido._id, "En proceso")}
                >
                  En proceso
                </button>
                <button
                  className={pedido.estado === "Completado" ? styles.buttonsuccessPedidos : styles.buttondangerPedidos}
                  onClick={() => handleEstadoChange(pedido._id, "Completado")}
                >
                  Completado
                </button>
                <button
                  className={pedido.estado === "Cancelado" ? styles.buttonsuccessPedidos : styles.buttondangerPedidos}
                  onClick={() => handleEstadoChange(pedido._id, "Cancelado")}
                >
                  Cancelado
                </button>
              </div>
              <button 
                className={styles.buttonDeletePedidos}
                onClick={() => handleDeletePedido(pedido.usuarioId)} // Pasa el usuarioId del pedido
              >
                Eliminar este pedido
              </button>
            </li>
          ))
        ) : (
          <p>No hay pedidos para mostrar</p>
        )}
      </ul>
    </div>
  );
};

export default PedidoLoading;
