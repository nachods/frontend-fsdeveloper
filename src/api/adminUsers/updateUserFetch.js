export const updateUsers = async (firstname, lastname) => {
    try {
      const url = "https://proyectfinal-backend-fsdeveloper-production.up.railway.app/api/v1/user/all"; // URL de la API para actualizar el usuario
  
      const params = {
        method: 'PATCH', // Tipo de solicitud https
        headers: {
          'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
        },
        body: JSON.stringify({
          firstname, // Enviar nombre del usuario
          lastname, // Enviar apellido del usuario
        }), // Convertir el objeto JavaScript a JSON
      };
  
      const response = await fetch(url, params); // Enviar la solicitud a través del fetch
      const result = await response.json(); // Analizar la respuesta pasando de JSON a objeto JavaScript
      
      if (response.status !== 200) throw result; // Lanzar error si el estado no es 200
  
      return result; // Si es exitoso, devolver el resultado
  
    } catch (error) {
      console.error('Error en updateUsers:', error); // Imprimir el error en la consola
      throw error; // Lanzar el error para manejarlo en el componente o en otro lugar
    }
  };
  