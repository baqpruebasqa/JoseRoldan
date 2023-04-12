import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function UsuarioAutenticado() {
  const {user, token, setUser, setToken, notificacion} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/usuario')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/usuarios">Inicio</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            BAQNET
          </div>
          <div>
            Hola, {user.nombres} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Cerrar sesión</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notificacion!=null ?
          <div className={notificacion.tipo==1?"notification":"notification-error"}>
            {notificacion.mensaje}
          </div>
          :
          null
        }
      </div>
    </div>
  )
}
