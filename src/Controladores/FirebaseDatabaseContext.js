import React,{useContext} from 'react'

import {getDatabaseId,eventoEstado,eventoEstadoRegistro,eventoControl,eventoConf} from './cloud'

/* Contexto de la base de datos */
export const databaseContext = React.createContext({
    id:null,
    estado:null,
    estadoRegistro:null,
    control: null,
    conf:null,
})

export const useDataBaseSession = () =>{
    const {id,estado,estadoRegistro,control,conf} = useContext(databaseContext)
    return ({id:id,estado:estado,estadoRegistro:estadoRegistro,control:control,conf:conf});
}
export const useDatabase = () => {
    const [id,setId] = React.useState(null);
    const [estado,setEstado] = React.useState(null);
    const [control,setControl] = React.useState(null);
    const [estadoRegistro,setEstadoRegistro] = React.useState(null);
    const [conf,setConf] = React.useState(null);
    
    

    React.useEffect(() => {
        var unEstado,unControl,unEstadoRegistro,unConf;
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
            unConf = eventoConf((conf)=>{
                setConf(conf);
            })
        })
        return (() => {
            console.log("DatabaseContext: Salgo");
            /*
            if (unEstado) unEstado.off();
            if(unId) unId.off();
            if (unControl) unControl.off();
            if (unEstadoRegistro) unEstadoRegistro.off();
            if(unConf) unConf.off();
            */
        })
      }, [])
      return ({
            id: id,
            estado:estado,
            control:control,
            estadoRegistro:estadoRegistro,
            conf:conf}
            );
  }
  
  