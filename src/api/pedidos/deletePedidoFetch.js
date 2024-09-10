export const deletePedidoFetch = async (usuarioId) => {
    try {
        const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/pedidos/delete/" + usuarioId;
    
        const params = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        };
    
        const response = await fetch(url, params);
    
        if (response.status !== 200) {
          throw new Error(`Error https! Estado: ${response.status}`);
        }
    
        const data = await response.json();
        return data; // Si es exitoso, devolver los datos de los usuarios
      } catch (error) {
        throw error;
      }
}