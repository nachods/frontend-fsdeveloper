import React, { useState } from "react";
import { createMenu } from '../../api/adminMenus/createMenuFetch'; // Asegúrate de usar la exportación nombrada

const CreateMenuLoading = () => {
  /* 
  Datos del formulario: Estado inicial del formulario
   */
  const [formData, setFormData] = useState({
    nombre: "",
    detalle: "",
    categoria: "",
    precio: "",
    image: null, // Ahora almacenamos el archivo en lugar de una cadena
  });

  /* 
   Validación de formulario: Estado para mensajes de error y éxito
   */
  const [error, setError] = useState(""); // Estado de los mensajes de error
  const [success, setSuccess] = useState(""); // Estado de mensaje de éxito
  const [preview, setPreview] = useState(null); // Estado para la vista previa de la imagen

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: file }); // Guardar el archivo en el estado
        setPreview(reader.result); // Actualizar la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) { // Evita agregar valores nulos o indefinidos
          formDataToSend.append(key, formData[key]);
        }
      });

      const res = await createMenu(formDataToSend); // Enviar datos del formulario
      setError(''); // Limpia el mensaje de error
      setSuccess(res.msg || 'Menú creado con éxito'); // Msg proveniente del backend
    } catch (error) {
      setError(error.message || 'Error al crear el menú'); // Mensaje genérico de error
      setSuccess(''); // Limpia el mensaje de éxito
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="detalle"
          placeholder="Detalle"
          value={formData.detalle}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
        {error && <p className="alert alert-danger">{error}</p>}
        <button type="submit">Crear</button>
        {success && <p className="alert alert-success">{success}</p>}
      </form>
    </div>
  );
};

export default CreateMenuLoading;
