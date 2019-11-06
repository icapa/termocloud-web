import React,{useState,useEffect} from 'react'

import {getDatabaseId,eventoEstado,eventoEstadoRegistro,eventoControl,eventoConf} from './cloud'

/* Contexto de la base de datos */

export const DatabaseContext = React.createContext(null);

export const useDatabase= ()=>{
    const [state, setState] = useState(null);

    const setId = (id)=>{
        console.log("Database: Actualizo ID");
        setState((prevState)=>({...prevState,id:id}));
    }
    const setEstado = (estado)=>{
        console.log("Database: Actualizo ESTADO");
        setState((prevState)=>({...prevState,estado:estado}));
    }
    const setControl = (control=>{
        console.log("Database: Actualizo CONTROL");
        setState((prevState)=>({...prevState,control:control}));
    })
    const setEstadoRegistro=(estadoRegistro)=>{
        console.log("Database: Actualizo REGISTRO");
        setState((prevState)=>({...prevState,estadoRegistro:estadoRegistro}));
    }
    const setConf = (conf)=>{
        console.log("Database: Actualizo CONF");
        setState((prevState)=>({...prevState,conf:conf}));
    }
    useEffect(() => {
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
            console.log("Database: Salgo");
            if (unEstado) unEstado.off();
            if(unId) unId.off();
            if (unControl) unControl.off();
            if (unEstadoRegistro) unEstadoRegistro.off();
            if(unConf) unConf.off();
        })
        },[]);
        
    return state;
    
}


  