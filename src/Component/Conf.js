import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab'
import {useState} from 'react';
import {useDatabase,databaseContext} from '../Controladores/FirebaseDatabaseContext'

import CeldaConf from './CeldaConf'
const styles = theme => ({
    celdaPar:{
        backgroundColor:"#c8ccff",
        
    },
    celdaImpar:{
        backgroundColor:"#ffffff",
        
    },
    main:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        margin: 0 ,
        padding: 0
    }
    
});

function Conf (props) {
    const { classes } = props;
    
    //const [ state, setState ] = useState(null);
    const {conf} = useDatabase()


    const onSubmitConf = (state)=>{
        console.log("Actualizamos: Celda!! ");
        console.log(state);
        //this.bbdd.actualizaConfiguracion(id,state);
    }
    const onSubmitDelete = (id) =>{
        console.log("Borramos elemento: " + id);
        //this.bbdd.borraConfiguracion(id);
    }
    
  
    const onSubmitAddConf = () =>{
        console.log("Añado un registro nuevo: ");
        console.log(conf);
        var dummy={ 
            
            hh_ii:"00:00",
            hh_ff:"23:59",
            estadoForm:"off",      
            L:false,
            M:false,
            X:false,
            J:false,
            V:false,
            S:false,
            D:false,
            temperatura: 20,
            enabled: false,
            pintaAceptar: false
        }
        //this.bbdd.creaConfiguracion(this.state.id,dummy);
    }
    

    

    const renderList= ()=>{
        const colorCelda = {
            colores:[
                {clase: classes.celdaPar},
                {clase: classes.celdaImpar} 
            ]
        }
        if (conf!==null){
            return(
                <div>
                    {conf.map((c,index) => 
                        <div className={colorCelda.colores[index%2].clase} key={index.toString()}>
                            <CeldaConf 
                                estado={conf[index]}
                                onSubmit = {onSubmitConf}
                                onDelete = {onSubmitDelete}
                            />
                        </div>
                    )}
                </div>
            );
        }
    }
    const renderButtonAdd = ()=>{
        if (conf!==null){
            return(
                <Fab color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon 
                        onClick ={onSubmitAddConf}
                    />
                </Fab>
            )
        }
    }
    
    return(
        <databaseContext.Provider value={{conf}}>
            <div className={classes.main}>
                {renderList()}
                {renderButtonAdd()}
            </div>       
        </databaseContext.Provider>
    );
    
}

export default withStyles(styles)(Conf);