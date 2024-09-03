import React, { useEffect, useState } from "react";
import styles from "../../pages/admin/AdminPage.module.css";
import stylesMenus from "../../pages/menues/MenuPage.module.css";
import CreateMenuLoading from "../Admin-Components/createMenuLoading";
import { getAllMenus } from "../../api/adminMenus/getAllMenusFetch";
import { updateMenus } from "../../api/adminMenus/updateMenuFetch";

const MenuLoading = () => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null); // Cargar y manejar errores
  const [searchMenus, setSearchMenus] = useState(""); // Buscador
  const [filterActive, setFilterActive] = useState("all"); // Filtrado

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
      menu.nombre.toLowerCase().includes(searchMenus.toLowerCase())
  );

  const handledUpdateMenu = async (nombre) => {
    try {
      const menuToUpdate = menus.find((menu) => menu.nombre === nombre);
  
      if (!menuToUpdate) {
        throw new Error("No se encontró el menú para actualizar");
      }
  
      const updatedData = {
        detalle: menuToUpdate.detalle,
        categoria: menuToUpdate.categoria,
        precio: menuToUpdate.precio,
        estado: !menuToUpdate.estado, // Cambiar el estado
      };
  
      await updateMenus(nombre, updatedData);
  
      // Refresca la lista de menús
      const updatedMenus = await getAllMenus();
      setMenus(updatedMenus);
    } catch (error) {
      setError("Error al actualizar el menú");
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
      <ul className={styles.MenuList}>
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <li key={menu.nombre}>
              <div className={stylesMenus.Menu}>
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
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No hay menús para mostrar</p>
        )}
      </ul>
      {error && <p>{error}</p>} {/* Mostrar mensajes de error */}
      <div className={styles.containerMenu}>
        <h4 className={styles.titleMenu}>Crear un Menú</h4>
        <CreateMenuLoading/>
      </div>
    </div>
  );
};

export default MenuLoading;
