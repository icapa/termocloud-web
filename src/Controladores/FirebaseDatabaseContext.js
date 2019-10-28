import React,{useContext} from 'react'

import {getDatabaseId,eventoEstado,eventoEstadoRegistro,eventoControl} from './cloud'

/* Contexto de la base de datos */
export const databaseContext = React.createContext({
    id:null,
    estado:null,
    estadoRegistro:null,
    control: null,
})

export const useDataBaseSession = () =>{
    const {id,estado,estadoRegistro,control} = useContext(databaseContext)
    return ({id:id,estado:estado,estadoRegistro:estadoRegistro,control:control});
}
export const useDatabase = () => {
    const [id,setId] = React.useState(null);
    const [estado,setEstado] = React.useState(null);
    const [control,setControl] = React.useState(null);
    const [estadoRegistro,setEstadoRegistro] = React.useState(null);
    
    
    React.useEffect(() => {
        var unEstado,unControl,unEstadoRegistro;
        const unId = getDatabaseId((id)=>{
            setId(id);
            unEstado = eventoEstado(id,(estado)=>{
                setEstado(estado);
                unEstadoRegistro = eventoEstadoRegistro(id,estado.registro,(registro)=>{
                    setEstadoRegistro(registro);
                })
            })
            unControl = eventoControl(id,(control)=>{
                setControl(control);
            })
        })
        return (() => {
            unEstado.off();
            unId.off();
            unControl.off();
            unEstadoRegistro.off();
        })
      }, [])
      return ({
            id: id,
            estado:estado,
            control:control,
            estadoRegistro:estadoRegistro}
            );
  }
  
  