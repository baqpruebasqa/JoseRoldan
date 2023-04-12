import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [cargando, setCargando] = useState(false);
  const {setNotificacion, user} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = (usuario) => {
    if(user.tipoUsuario==="Administrador"){
      let resultado=usuario;
      delete resultado.created_at;
      if (!window.confirm("¿Está seguro que desea eliminar a este usuario?")) {
        return
      }
      axiosClient.delete(`/usuarios/${usuario.id}`,resultado)
        .then(() => {
          setNotificacion({tipo:1,mensaje:'El usuario fue eliminado correctamente'})
          getUsers()
        })
        .catch(err => {
          setNotificacion({tipo:2,mensaje:'Hubo un problema al eliminar el usuario.'});
        })
    }
    else{
      setNotificacion({tipo:2,mensaje:'No tiene los permisos para realizar esta acción'});
    }
  }

  const getUsers = () => {
    setCargando(true)
    axiosClient.get('/usuarios')
      .then(({ data }) => {
        setCargando(false)
        setUsers(data.data)
      })
      .catch(() => {
        setCargando(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Usuarios</h1>
        
          <Link className="btn-add" to="/usuarios/new">Nuevo</Link>
      
    
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Tipo Usuario</th>
            <th>Acciones</th>            
          </tr>
          </thead>
          {cargando &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Cargando...
              </td>
            </tr>
            </tbody>
          }
          {!cargando &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombres}</td>
                <td>{u.apellidos}</td>
                <td>{u.email}</td>
                <td>{u.direccion}</td>
                <td>{u.telefono}</td>
                <td>{u.tipoUsuario}</td>
                <td>
                  { user.tipoUsuario==="Visualizador" &&
                      <Link className="btn-show" to={'/usuarios/' + u.id} state={{u:u}}>Mostrar</Link>
                  }
                  { user.tipoUsuario!=="Visualizador" &&
                      <Link className="btn-edit" to={'/usuarios/' + u.id} state={{u:u}}>Editar</Link>
                  }
                  &nbsp;
                  { user.tipoUsuario==="Administrador" &&
                    <button className="btn-delete" onClick={()=>onDeleteClick(u)}>Eliminar</button>
                  }
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
