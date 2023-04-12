export default function ErrorFormulario({errores}){
    return(
        
        errores!=null?
            <div className="alert">
                {
                errores!='Error'&&typeof(errores)!="string"?
                Object.keys(errores).map((key) => {
                    if(errores[key][0]!="El correo electrónico seleccionado es inválido."){
                       return <li key={key}>{errores[key][0]}</li>
                    }
                    else{
                        return null;
                    }
                })
               
                :
                <li>{'El usuario o contraseña ingresados son incorrectos'}</li>
                
                }
            </div>
        :
        null
        
    )
}