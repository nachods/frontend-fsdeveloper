export const createMenu = async (formData) => {
  try {
    const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/menu";

    const response = await fetch(url, {
      method: "POST",
      body: formData, // Enviar FormData directamente
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Error en la solicitud");
    return result;
  } catch (error) {
    throw error;
  }
};
