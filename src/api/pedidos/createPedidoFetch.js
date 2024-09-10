export const createPedidoFetch = async (usuarioId, productos) => { 
    try {
      const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/pedidos/crear";

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuarioId, productos }), // Enviar usuarioId junto con los productos
      };

      const response = await fetch(url, params); 
      const result = await response.json(); 
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
};
