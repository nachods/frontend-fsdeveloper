import { createContext, useState  } from "react";
export const AuthContext = createContext();

export const AuthProvider = () => {
  
    const [user, setUser] = useState(null);//user estatico de momento
  
    const login = async () => { //funcion que inicia la sesion
        try{

        }catch (error){
            console.log(error);
        }
    }

    const logout = async () => {  //funcion que termina de sesion
        
    }

    const data = { //Datos a utilizar en todo el sitio
        user,
        setUser,
        login,
        logout,
    }

    return <AuthContext.Provider value={data}></AuthContext.Provider>;
};
