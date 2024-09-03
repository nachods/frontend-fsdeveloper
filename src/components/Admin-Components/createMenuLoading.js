import React, { useState } from "react";

const CreateMenuLoading = () => {
  /* 
  Datos del formulario: Estado inicial del formulario
   */
  const [formData, setFormData] = useState({
    nombre: "",
    detalle: "",
    categoria: "",
    precio: "",
    image: "", // La URL de la imagen o el archivo base64
  });

  /* 
   Validación de formulario: Estado para mensajes de error y éxito
   */
  const [error, setError] = useState(null); // Estado de los mensajes de error
  const [success, setSuccess] = useState(null); // Estado de mensaje de éxito
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
        setFormData({ ...formData, image: reader.result }); // Guardar el archivo en el estado
        setPreview(reader.result); // Actualizar la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir lógica para manejar el envío del formulario
    // Por ejemplo, validaciones o llamadas a una API
    setSuccess("Menú creado con éxito");
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
          placeholder="Categoria"
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
            style={{ width: "100px", height: "100px" }}
          />
        )}
        {error && <p className="alert alert-danger">{error}</p>}
        <button type="submit">Crear</button>
        {success && <p className="alert alert-success">Menú Creado</p>}
      </form>
    </div>
  );
};

export default CreateMenuLoading;
