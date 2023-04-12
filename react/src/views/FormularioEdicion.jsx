import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import ErrorFormulario from "./ErrorFormulario.jsx";

export default function FormularioEdicion() {

  const navigate = useNavigate();
  let {id} = useParams();
  const [usuario, setUsuario] = useState({
    id:null,
    nombres:"",
    apellidos:"",
    email: "",
    password: "",
    password_confirmation: "",
    direccion: "",
    telefono: "",
    tipoUsuario: "Visualizador",
  })
  const [errores, setErrores] = useState('')
  const [cargando, setCargando] = useState(false)
  const {setNotificacion, user} = useStateContext()
  const datos=useLocation();

  useEffect(() => {
      if(id){
        if(datos.state!=null){
          setCargando(false)
          let resultado=datos.state.u;
          delete resultado.created_at;
          setUsuario(resultado)
        }
        else{
          navigate('/usuarios')
        }
      }
    }, [])

  const handleChange = (event) => {
    setUsuario({ ...usuario, [event.target.name]: event.target.value });
  };

  const actualizar=(usuarioPendiente)=>{
    axiosClient.put(`/usuarios/${usuario.id}`, usuarioPendiente)
          .then(() => {
            setNotificacion({tipo:1,mensaje:'El usuario fue actualizado exitosamente'})
            navigate('/usuarios')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrores(response.data.errors)
            }
          })
  }

  const onSubmit = ev => {
    ev.preventDefault();
    if(user.tipoUsuario!=="Visualizador"){
      if (usuario.id) {
        if(usuario.password===""||usuario.password_confirmation===""){
          if(usuario.password===usuario.password_confirmation){
            let auxiliar={...usuario}
            delete auxiliar.password;
            delete auxiliar.password_confirmation;
            actualizar(auxiliar)
          }
          else{
            if(usuario.password_confirmation!==""){
              let ultimo={...usuario}
              ultimo.password=""
              actualizar(ultimo)
            }
          }
        }
        else{
          if(usuario.password==undefined&&usuario.password_confirmation!=undefined){
            let ultimo={...usuario}
            ultimo.password=""
            actualizar(ultimo)
          }
          else{
            actualizar(usuario)
          }
        }
        
        
      } else {
        axiosClient.post('/usuarios', usuario)
          .then(() => {
            setNotificacion({tipo:1,mensaje:'El usuario fue registrado exitosamente'})
            navigate('/usuarios')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrores(response.data.errors)
            }
          })
      }
    }
    else{
      setNotificacion({tipo:2,mensaje:'No tiene los permisos para realizar esta acción'})
    }
  }

  return (
    <>
      {usuario.id && <h1>Actualizar datos de usuario: {usuario.nombres+" "+usuario.apellidos}</h1>}
      {!usuario.id && <h1>Nuevo usuario</h1>}
      <div className="card animated fadeInDown">
        {cargando && (
          <div className="text-center">
            Cargando...
          </div>
        )}
        {errores!='' &&
            <ErrorFormulario errores={errores}></ErrorFormulario>
        }
        {!cargando && (
          <form onSubmit={onSubmit}>
          <input value={usuario.nombres} name="nombres" onChange={(e)=>handleChange(e)} type="text" placeholder="Nombres" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          <input value={usuario.apellidos} name="apellidos" onChange={(e)=>handleChange(e)} type="text" placeholder="Apellidos" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          <input value={usuario.email} name="email" onChange={(e)=>handleChange(e)} type="email" placeholder="Correo" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          <input name="password" onChange={(e)=>handleChange(e)} type={user.tipoUsuario==="Visualizador"&&id!==undefined?"hidden":"password"} placeholder="Contraseña" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          <input name="password_confirmation" onChange={(e)=>handleChange(e)} type={user.tipoUsuario==="Visualizador"&&id!==undefined?"hidden":"password"} placeholder="Confirmar Contraseña" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          <input value={usuario.direccion} name="direccion" onChange={(e)=>handleChange(e)} type="text" placeholder="Dirección" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          <input value={usuario.telefono} name="telefono" onChange={(e)=>handleChange(e)} type="text" placeholder="Teléfono" disabled={user.tipoUsuario==="Visualizador"&&id!==undefined}/>
          {user.tipoUsuario==="Administrador" &&
           <select name={"tipoUsuario"} value={usuario.tipoUsuario} onChange={(e)=>handleChange(e)}>
            <option value="Visualizador" >Visualizador</option>
            <option value="Coordinador" >Coordinador</option>
            <option value="Administrador" >Administrador</option>
           </select>
          }
          {((user.tipoUsuario==="Visualizador" && id===undefined)||(user.tipoUsuario!=="Visualizador")) &&  
              <button className="btn">Guardar</button>
          }
          </form>
          
        )}
      </div>
    </>
  )
}
