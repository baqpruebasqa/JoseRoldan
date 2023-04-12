import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";
import ErrorFormulario from "./ErrorFormulario.jsx";

export default function Login() {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const { setUser, setToken } = useStateContext()
  const [errores, setErrores] = useState(null)
  const[mensaje,setMensaje]=useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    setErrores(null)
   
      const payload = {
        email: email,
        password: password,
      }
      axiosClient.post('/login', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
              setErrores(response.data.errors)
             
            
             if(email!=""&&password!=""){
              setErrores('Error');
             }
             
            
          }
        })
    
   
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Inicie sesión en su cuenta</h1>

          {errores &&
            <ErrorFormulario errores={errores}></ErrorFormulario>
          }

          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Correo"/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Contraseña"/>
          <button className="btn btn-block">Iniciar Sesión</button>
          <p className="message">¿No está registrado? <Link to="/registro">Crear una cuenta</Link></p>
        </form>
      </div>
    </div>
  )
}
