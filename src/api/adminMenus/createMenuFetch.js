export const createMenu = async (data) => {
  try {
    const url = "http://localhost:3977/api/v1/menu";

    const params = {
      method: "POST", // Tipo de solicitud HTTP
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Cadena Js a JSON, convierto el usuario
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;
    return result;
  } catch (error) {
    throw error;
  }
};
