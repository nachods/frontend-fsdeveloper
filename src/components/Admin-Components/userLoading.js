import React, { useState, useEffect } from "react";
import styles from "../../pages/admin/AdminPage.module.css"; // Asegúrate de que esta ruta sea correcta
import { getAllUsers } from "../../api/adminUsers/getAllUsersFetch"; // Ajusta la ruta si es necesario
import { updateUsers } from "../../api/adminUsers/updateUserFetch";

const UserLoading = () => {
  const [users, setUsers] = useState([]); //Cargar usuario
  const [error, setError] = useState(null); //Cargar y manejar errores
  const [searchUsers, setSearchUsers] = useState(""); //Buscador
  const [filterActive, setFilterActive] = useState("all"); //Filtrado

  useEffect(() => {
    // Usar la función importada, cuando se carga la pagina
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); // Usar la función importada
        setUsers(data);
      } catch (error) {
        setError("Error al cargar los usuarios");
      }
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios basados en la búsqueda y el filtro de estado
  const filteredUsers = users.filter(
    (user) =>
      (filterActive === "all" || user.active.toString() === filterActive) &&
      (user.firstname.toLowerCase().includes(searchUsers.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchUsers.toLowerCase()))
  );

  const handledUpdateUser = async (firstname, lastname) => {
    try {
      // Llamar a la función para actualizar el usuario
      await updateUsers(firstname, lastname);

      // Actualizar el estado local si la actualización fue exitosa
      setUsers(
        users.map((user) =>
          user.firstname === firstname && user.lastname === lastname
            ? { ...user, active: !user.active } // Alternar el estado localmente
            : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar el usuario:", error); // Imprimir el error en la consola
      setError("Error al actualizar el usuario"); // Establecer el mensaje de error
    }
  };

  return (
    <div className={styles.containerPerson}>
      <h4 className={styles.titlePerson}>Sección de Usuarios</h4>
      <input className={styles.inputPerson}
        type="text"
        placeholder="Buscar usuarios por nombre o apellido"
        value={searchUsers}
        onChange={(e) => setSearchUsers(e.target.value)}
      />
      <select className={styles.inputPerson}
        value={filterActive}
        onChange={(e) => setFilterActive(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="true">Activos</option>
        <option value="false">Inactivos</option>
      </select>
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={`${user.firstname}-${user.lastname}`} className={styles.liPerson}>
              {user.firstname} {user.lastname} -{" "}
              {user.active ? "Activo" : "Inactivo"}
              <button className={`${user.active ? styles.buttonsuccess : styles.buttondanger}`}
                onClick={() => handledUpdateUser(user.firstname, user.lastname)}
              >
                <i className="bi bi-check-circle-fill"></i>
              </button>
            </li>
          ))
        ) : (
          <p>No hay usuarios para mostrar</p>
        )}
      </ul>
      {error && <p>{error}</p>} {/* Mostrar mensajes de error */}
    </div>
  );
};

export default UserLoading;
