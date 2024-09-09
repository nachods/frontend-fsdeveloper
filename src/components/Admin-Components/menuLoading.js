import React, { useEffect, useState } from "react";
import styles from "../../pages/admin/AdminPage.module.css";
import stylesMenus from "../../pages/menues/MenuPage.module.css";
import CreateMenuLoading from "../Admin-Components/createMenuLoading";
import UpdateMenuLoading from "../Admin-Components/updateMenuLoading";
import { getAllMenus } from "../../api/adminMenus/getAllMenusFetch";
import { updateMenus } from "../../api/adminMenus/updateMenuFetch";
import { deleteMenus } from "../../api/adminMenus/deleteMenuFetch";

const MenuLoading = () => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null); // Cargar y manejar errores
  const [searchMenus, setSearchMenus] = useState(""); // Buscador por nombre
  const [filterActive, setFilterActive] = useState("all"); // Filtrado por estado
  const [filterCategory, setFilterCategory] = useState("all"); // Filtro por categoría

  useEffect(() => {
    // Se carga la función apenas carga la página
    const fetchMenus = async () => {
      try {
        const data = await getAllMenus();
        setMenus(data);
      } catch (error) {
        setError("Error en la carga de los menús");
      }
    };

    fetchMenus();
  }, []);

  // Filtros para la búsqueda de menús
  const filteredMenus = menus.filter(
    (menu) =>
      (filterActive === "all" || String(menu.estado) === filterActive) &&
      (filterCategory === "all" || menu.categoria === filterCategory) &&
      menu.nombre.toLowerCase().includes(searchMenus.toLowerCase())
  );

  // Maneja la actualización del estado de un menú
  const handledUpdateMenu = async (nombre) => {
    try {
      const menuToUpdate = menus.find((menu) => menu.nombre === nombre);
  
      if (!menuToUpdate) {
        throw new Error("No se encontró el menú para actualizar"); // Error si no se encuentra el menú
      }
  
      // Crear un FormData para enviar los datos
      const formData = new FormData();
      formData.append('nombre', nombre); // Nombre del menú a actualizar
      formData.append('detalle', menuToUpdate.detalle);
      formData.append('categoria', menuToUpdate.categoria);
      formData.append('precio', menuToUpdate.precio);
      formData.append('estado', !menuToUpdate.estado); // Cambia el estado
  
      // Si hay una imagen nueva, deberías añadirla al FormData
      if (menuToUpdate.image) {
        formData.append('image', menuToUpdate.image); // Añade la imagen si existe
      }
  
      await updateMenus(nombre, formData); // Envía la actualización al servidor
  
      // Refresca la lista de menús
      const updatedMenus = await getAllMenus();
      setMenus(updatedMenus); // Actualiza la lista de menús
    } catch (error) {
      setError("Error al actualizar el menú"); // Mensaje de error en caso de fallo
    }
  };

  // Maneja la eliminación de un menú
  const handleDeleteMenu = async (nombre) => {
    try {
      await deleteMenus(nombre); // Llama a la función para eliminar el menú
      // Refresca la lista de menús después de la eliminación
      const updatedMenus = await getAllMenus();
      setMenus(updatedMenus);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(`Error al eliminar el menú: ${error.message}`); // Mensaje de error en caso de fallo
    }
  };

  const handleMenuCreated = async () => {
    try {
      const data = await getAllMenus(); // Refrescar los menús después de crear uno nuevo
      setMenus(data);
    } catch (error) {
      setError("Error al cargar los menús");
    }
  };

  const handleMenuUpdated = async () => {
    try {
      const data = await getAllMenus();
      setMenus(data);
    } catch (error) {
      setError("Error al cargar los menús");
    }
  };

  return (
    <div className={styles.containerMenu}>
      <h4 className={styles.titleMenu}>Sección de Menús</h4>
      <input
        className={styles.inputMenu}
        type="text"
        placeholder="Buscar menús"
        value={searchMenus}
        onChange={(e) => setSearchMenus(e.target.value)}
      />
      <select
        className={styles.inputMenu}
        value={filterActive}
        onChange={(e) => setFilterActive(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="true">Activos</option>
        <option value="false">Inactivos</option>
      </select>
      <select
        className={styles.inputMenu}
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">Todas las Categorías</option>
        <option value="Pizza">Pizza</option>
        <option value="Sandwich">Sandwich</option>
        <option value="Empanadas">Empanadas</option>
      </select>
      <ul className={styles.MenuList}>
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <li key={menu.nombre}>
              <div className={styles.Menu}>
                <img
                  src={"http://localhost:3977/" + menu.image}
                  alt={menu.nombre}
                  className={stylesMenus.MenuImg}
                />
                <div className={stylesMenus.subMenu}>
                  <h4 className={stylesMenus.MenuTitle}>{menu.nombre}</h4>
                  <p className={stylesMenus.MenuDesc}>{menu.detalle}</p>
                  <p className={stylesMenus.MenuDesc}>{menu.categoria}</p>
                  <h5 className={stylesMenus.MenuPrice}>${menu.precio}</h5>
                  <div className={styles.StatusMenu}>
                    {menu.estado ? "Activo" : "Inactivo"}
                    <button className={`${menu.estado ? styles.buttonsuccess : styles.buttondanger}`}
                      onClick={() => handledUpdateMenu(menu.nombre)}
                    >
                      <i className="bi bi-check-circle-fill"></i>
                    </button>
                  </div>
                  <button 
                    className={styles.DeleteMenu} 
                    onClick={() => handleDeleteMenu(menu.nombre)}
                  >
                    Eliminar Menu
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No hay menús para mostrar</p>
        )}
      </ul>
      <div className={styles.containerCreateMenu}>
        <h4 className={styles.titleMenu}>Crear un Menú</h4>
        <CreateMenuLoading onMenuCreated={handleMenuCreated} /> {/* Pasar la función para manejar la creación */}
      </div>
      <div className={styles.containerCreateMenu}>
        <h4 className={styles.titleMenu}>Actualiza un Menú</h4>
        <UpdateMenuLoading onMenuUpdated={handleMenuUpdated} />
      </div>
    </div>
  );
};

export default MenuLoading;
