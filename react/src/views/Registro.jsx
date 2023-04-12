import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import ErrorFormulario from "./ErrorFormulario.jsx";

export default function Registro() {
  const [nuevoUsuario,setNuevoUsuario] =useState({
    nombres:"",
    apellidos:"",
    email: "",
    password: "",
    passwordConfirmation: "",
    direccion: "",
    telefono: "",
  })
  const {setUser, setToken} = useStateContext()
  const [errores, setErrores] = useState(null)

  const handleChange = (event) => {
    setNuevoUsuario({ ...nuevoUsuario, [event.target.name]: event.target.value });
  };

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      nombres: nuevoUsuario.nombres,
      apellidos:nuevoUsuario.apellidos,
      email: nuevoUsuario.email,
      password: nuevoUsuario.password,
      password_confirmation: nuevoUsuario.passwordConfirmation,
      direccion:nuevoUsuario.direccion,
      telefono:nuevoUsuario.telefono,
      tipoUsuario:"Visualizador"
    }
    axiosClient.post('/registro', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrores(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Registro de Usuario</h1>
          {errores &&
            <ErrorFormulario errores={errores}></ErrorFormulario>
          }
          <input value={nuevoUsuario.nombres} name="nombres" onChange={(e)=>handleChange(e)} type="text" placeholder="Nombres"/>
          <input value={nuevoUsuario.apellidos} name="apellidos" onChange={(e)=>handleChange(e)} type="text" placeholder="Apellidos"/>
          <input value={nuevoUsuario.email} name="email" onChange={(e)=>handleChange(e)} type="email" placeholder="Correo"/>
          <input value={nuevoUsuario.password} name="password" onChange={(e)=>handleChange(e)} type="password" placeholder="Contraseña"/>
          <input value={nuevoUsuario.passwordConfirmation} name="passwordConfirmation" onChange={(e)=>handleChange(e)} type="password" placeholder="Confirmar Contraseña"/>
          <input value={nuevoUsuario.direccion} name="direccion" onChange={(e)=>handleChange(e)} type="text" placeholder="Dirección"/>
          <input value={nuevoUsuario.telefono} name="telefono" onChange={(e)=>handleChange(e)} type="text" placeholder="Teléfono"/>
          
          <button className="btn btn-block">Registro</button>
          <p className="message">¿Ya estás registrado? <Link to="/login">Iniciar sesión</Link></p>
        </form>
      </div>
    </div>
  )
}
