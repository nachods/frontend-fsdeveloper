export const updateStatusPedidoFetch = async (pedidoID, nuevoEstado) => {
    try {
      const url = "http://localhost:3977/api/v1/pedidos/status";
  
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pedidoId: pedidoID, // Asegúrate de que el campo coincida con el backend
          nuevoEstado,
        }),
      };
    
      const response = await fetch(url, params);
      const result = await response.json();
      
      if (response.status !== 200) throw result;
  
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  