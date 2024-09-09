export const getMePedidoFetch = async (usuarioID) => {
  try {
    const url = `http://localhost:3977/api/v1/pedidos/crear/${usuarioID}`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params); // Envio la data a través del fetch
    const result = await response.json(); // Analiza respuesta pasando de JSON a JS

    if (response.status !== 200) throw response;
    return result; // Si es exitoso, devuelve el objeto JS con la info del nuevo usuario
  } catch (error) {
    throw error;
  };
};
