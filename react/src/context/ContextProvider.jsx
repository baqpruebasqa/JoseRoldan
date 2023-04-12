import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notificacion: null,
  setUser: () => {},
  setToken: () => {},
  setNotificacion: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState(useState({
    id:null,
    nombres:"",
    apellidos:"",
    email: "",
    password: "",
    passwordConfirmation: "",
    direccion: "",
    telefono: "",
    tipoUsuario: "",
  }));
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notificacion, _setNotificacion] = useState(null);

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setNotificacion = message => {
    _setNotificacion(message);

    setTimeout(() => {
      _setNotificacion(null)
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notificacion,
      setNotificacion
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
