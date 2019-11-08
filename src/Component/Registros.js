import React, { useState,useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';


import DiaRegistro from './DiaRegistro'
import ItemRegistro from './ItemRegistro'
//import { Typography } from '@material-ui/core';
import {eventoRegistroYEventos} from '../Controladores/cloud';


var moment = require('moment');

const styles = theme => ({
    root: {
        //...theme.mixins.gutters(),
        //paddingTop: theme.spacing.unit * 2,
        //paddingBottom: theme.spacing.unit *2,
        flex:1,
        alignItems:'center',
        margin:0,
        padding:0
        
    },
    separador:{
        align:'center',
        
    },
    cabecera:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'lightGray'
    },
    table:{
        minWidth:400,
        width:'100%'
    }
});



function Registros(props){
    const {tipo} = props;
    const {classes} = props;
    const [items, setItems] = useState([]);
    const [ref,setRef] = useState(null);
    const [estadoFecha,setEstadoFecha] = useState(moment().format().split('T')[0]);
    
    useEffect(() =>{
        const fecha=moment().format().split('T')[0];
        //onUpdateFecha(fecha);
        setEstadoFecha(fecha);
        console.log("Registros: Primer paso");
    },[]);

    useEffect(()=>{
        if (ref){
            ref.off();  // Primero paramos de escuchar el q está
        }
        setRef(eventoRegistroYEventos(tipo,estadoFecha,(items)=>{
            setItems(items);
        }))
        console.log("Registros: Cambio el estado");
    },[estadoFecha,tipo]);
    
    const onUpdateFecha=(fecha)=>{
        setEstadoFecha(fecha);
    };

    const renderCabeceraEventos = ()=>{
        return(
            <div>
                <div className={classes.cabecera}>
                    <div align="center" style={{width:'25%'}}><span>Hora</span></div>
                    <div align="center" style={{width:'5%'}}><span>On</span></div>
                    <div align="center" style={{width:'40%'}}><span>Modo</span></div>
                    <div align="center" style={{width:'15%'}}><span></span>Tª</div>
                    <div align="center" style={{width:'15%'}}><span></span>TªObj</div>
                </div>
                </div>
        );

    }
    const renderCabeceraRegistros =  ()=>{
        return(
            <div>
                <div className={classes.cabecera}>
                    <div align="center" style={{width:'40%'}}><span>Hora</span></div>
                    <div align="center" style={{width:'30%'}}><span></span>Temperatura</div>
                    <div align="center" style={{width:'30%'}}><span></span>TªObj</div>
                </div>
                </div>
        );
    }
    const renderCabeceras = () =>{
        if (tipo==="eventos"){
            return renderCabeceraEventos();
        }else if (tipo==="registros"){
            return renderCabeceraRegistros();
        }
    }

    return(
        <div className={classes.root}>
            <DiaRegistro  onUpdate={onUpdateFecha}/>
                {renderCabeceras()}
            {items.map((c,index) => 
                <div key={index.toString()}>
                    <ItemRegistro tipo={tipo} item={c} />
                </div>
            )}
                    
        </div>
        
    );

}

export default withStyles(styles)(Registros);