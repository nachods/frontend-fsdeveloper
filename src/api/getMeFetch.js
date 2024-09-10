export const getMeFetch = async (token) => {
  try {
    const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/user/me"; // Donde envío los datos

    const params = {
      headers: {
        Authorization: `Bearer ${token}`, //es el token del usuario
      },
    };

    const response = await fetch(url, params); // Envio la data a través del fetch
    const result = await response.json(); // Analiza respuesta pasando de JSON a JS

    if (response.status !== 200) throw response;
    return result; // Si es exitoso, devuelve el objeto JS con la info del nuevo usuario
  } catch (error) {
    throw error;
  }
};
