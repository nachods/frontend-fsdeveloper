export const loginFetch = async (data) => {
  try {
    const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/auth/login"; // Donde envío los datos

    const params = {
      method: "POST", // Tipo de solicitud https
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Cadena JS a JSON, convierto el usuario
        email: data.email,
        password: data.password,
      }),
    };

    const response = await fetch(url, params); // Envio la data a través del fetch
    const request = await response.json(); // Analiza respuesta pasando de JSON a JS

    if (!response.ok) throw request; // Lanza error si la respuesta no es exitosa
    return request; // Si es exitoso, devuelve el objeto JS con la info del nuevo usuario
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Propaga el error al manejador de submit en el frontend
  }
};
