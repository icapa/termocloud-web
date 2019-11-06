import React,{useState,useEffect} from 'react'

import {getDatabaseId,eventoEstado,eventoEstadoRegistro,eventoControl,eventoConf} from './cloud'

/* Contexto de la base de datos */

export const DatabaseContext = React.createContext(null);

export const useDatabase= ()=>{
    const [state, setState] = useState(null);

    const setId = (id)=>{
        setState((prevState)=>({...prevState,id:id}));
    }
    const setEstado = (estado)=>{
        setState((prevState)=>({...prevState,estado:estado}));
    }
    const setControl = (control=>{
        setState((prevState)=>({...prevState,control:control}));
    })
    const setEstadoRegistro=(estadoRegistro)=>{
        setState((prevState)=>({...prevState,estadoRegistro:estadoRegistro}));
    }
    const setConf = (conf)=>{
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


/*

export const DatabaseContextProvider = (props) =>{
        
    const [state,setState] = useState(null);
    

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
            
            
            if (unEstado) unEstado.off();
            if(unId) unId.off();
            if (unControl) unControl.off();
            if (unEstadoRegistro) unEstadoRegistro.off();
            if(unConf) unConf.off();
            
        })
      }, [])
      

      const setId = (id)=>{
          console.log("ACTUALIZO EL ID ");
          setState((prevState)=>({...prevState,id:id}));
          
          
      }
      const setEstado = (estado)=>{
          console.log("ACTUALIZO EL ESTADO ");
          setState((prevState)=>({...prevState,estado:estado}));
      }
      const setControl = (control=>{
          console.log("ACTUALIZO EL CONTROL ");
          setState((prevState)=>({...prevState,control:control}));
      })
      const setEstadoRegistro=(estadoRegistro)=>{
          console.log("ACTUALIZO EL ESTADO REGISTRO ");
          setState((prevState)=>({...prevState,estadoRegistro:estadoRegistro}));
      }
      const setConf = (conf)=>{
          console.log("ACTUALIZO LA CONF ");
          setState((prevState)=>({...prevState,conf:conf}));
      }
  
    return (
        <DatabaseContext.Provider database={state}>
            {props.children}
            {console.log("Entro por aqui")}
        </DatabaseContext.Provider>
    )
}

/*
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
            
            if (unEstado) unEstado.off();
            if(unId) unId.off();
            if (unControl) unControl.off();
            if (unEstadoRegistro) unEstadoRegistro.off();
            if(unConf) unConf.off();
            
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
*/  


  