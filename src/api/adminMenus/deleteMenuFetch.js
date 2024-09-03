export const deleteMenus = async (nombre) => {
  try {
    const url = "http://localhost:3977/api/v1/menu/" + nombre;

    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error(`Error HTTP! Estado: ${response.status}`);
    }

    const data = await response.json();
    return data; // Si es exitoso, devolver los datos de los usuarios
  } catch (error) {
    throw error;
  }
};
