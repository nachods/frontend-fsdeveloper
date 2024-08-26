import { createContext, useState } from "react";
import { loginFetch } from "../api/loginFetch"; // Importar la función de loginFetch

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user estático de momento

  const login = async (data) => {
    try {
      const { access } = await loginFetch(data); // Usar loginFetch para obtener el token
      setUser({ token: access }); // Actualizar el estado con el token
      return access; // Devolver el token si se necesita en el componente
    } catch (error) {
      console.log(error);
      throw error; // Propagar el error para que el componente lo maneje
    }
  };

  const logout = async () => {
    // Función que termina de sesión
    setUser(null); // Limpiar el estado del usuario
  };

  const data = {
    // Datos a utilizar en todo el sitio
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContext;
