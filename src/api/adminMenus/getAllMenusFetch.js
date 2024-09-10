export const getAllMenus = async () => {
  try {
    const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/menu";

    const params = {
      method: "GET", // Tipo de solicitud https
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(`Error https! Estado: ${response.status}`);
    }

    return data; // Si es exitoso, devolver los datos de los usuarios
  } catch (error) {
    throw error; // Lanzar el error para manejarlo en el componente o en otro lugar
  }
};
