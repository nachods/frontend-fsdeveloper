export const getAllUsers = async () => {
  try {
    const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/user/all"; // URL de la API para obtener todos los usuarios

    const params = {
      method: "GET", // Tipo de solicitud https
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido como JSON (opcional para GET)
      },
    };

    const response = await fetch(url, params); // Enviar solicitud GET a través del fetch
    const data = await response.json(); // Analizar respuesta pasando de JSON a objeto JavaScript

    if (response.status !== 200)
      throw new Error(`Error https! Estado: ${response.status}`); // Lanzar error si el estado no es 200

    return data; // Si es exitoso, devolver los datos de los usuarios
  } catch (error) {
    console.error("Error al obtener usuarios:", error); // Imprimir el error en la consola
    throw error; // Lanzar el error para manejarlo en el componente o en otro lugar
  }
};
