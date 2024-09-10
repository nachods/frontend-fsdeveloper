export const registerFetch = async (data) => {
  try {
    const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/auth/register"; // Donde envio los datos

    const params = {
      method: "POST", // Tipo de solicitud https
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Cadena Js a JSON, convierto el usuario
    };

    const response = await fetch(url, params); // Envio la data a través del fetch
    const result = await response.json(); // Analiza respuesta pasando de JSON a Js
    if (response.status !== 200) throw result;
    return result; // Si es exitoso, devuelve el objeto Js con la info del nuevo usuario
  } catch (error) {
    throw error;
  }
};
