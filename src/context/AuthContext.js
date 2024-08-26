import { createContext, useEffect, useState } from "react";
import { getMeFetch } from '../api/getMeFetch';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user estático de momento

  useEffect(() => {
    //hacemos esto para que se active al entrar a la pagina por primera vez

    (async () => {
      const token = localStorage.getItem("access");
      console.log(token);
      await login(token);
    })();
  }, []);

  const login = async (token) =>{
		try{
			const user = await getMeFetch(token);
			delete user.password;
			setUser(user);
		} catch(error){
			console.log(error);
		}
	}

  const logout = () => {
		setUser(false); //se borra el user
		localStorage.clear(); //se borra el local storage
	}

  const data = {
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContext;
