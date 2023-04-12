import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import NoEncontrado from "./views/NoEncontrado.jsx";
import Registro from "./views/Registro";
import Usuarios from "./views/Usuarios.jsx";
import FormularioEdicion from "./views/FormularioEdicion.jsx";
import UsuarioNoAutenticado from "./componentes/UsuarioNoAutenticado.jsx";
import UsuarioAutenticado from "./componentes/UsuarioAutenticado.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <UsuarioAutenticado/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/usuarios"/>
      },
      {
        path: '/usuarios',
        element: <Usuarios/>
      },
      {
        path: '/usuarios/new',
        element: <FormularioEdicion key="userCreate" />
      },
      {
        path: '/usuarios/:id',
        element: <FormularioEdicion key="userUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <UsuarioNoAutenticado/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/registro',
        element: <Registro/>
      }
    ]
  },
  {
    path: "*",
    element: <NoEncontrado/>
  }
])

export default router;
