import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'react';
import DiaRegistro from './DiaRegistro'

import {bbddGetAllEventsAndInit} from '../Controladores/cloud';
import {MomentoAFecha,FechaAMomento} from '../Controladores/Fechas';
import {consumoGetTotal} from '../Controladores/ConsumoControl';
import { DeviceBluetoothDisabled } from 'material-ui/svg-icons';

var moment = require('moment');

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit *2,
        flex:1,
        alignItems:'center',
        backgroundColor:'blue',
        flexDirection:'column'
    },
    listaBotones: {
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
});



function Consumo(props){
    
    const {classes} = props;
    const [estadoFecha,setEstadoFecha] = useState(null);
    const [estadoConsumo,setEstadoConsumo] = useState(null);

    useEffect(() =>{
        const fecha=MomentoAFecha(moment());
        setEstadoFecha(fecha);
    },[]);
    
    useEffect(()=>{  
        if (estadoFecha===null) return;
        console.log("Consumo: Cambiamos dia " + estadoFecha);
        /*
        bbddGetAllEventsAndInit(FechaAMomento(estadoFecha),(inicio,items)=>{
            const con = consumoGetTotal(inicio,items);
            setEstadoConsumo(con);
        })
        */
       bbddGetAllEventsAndInit(FechaAMomento(estadoFecha))
       .then((resp)=>{
            const con = consumoGetTotal(resp.inicio,resp.items);
            setEstadoConsumo(con);
       })
    },[estadoFecha]);
    const handleDia = (dia)=>{    
        setEstadoFecha(dia);
    }
    return (
        <div>
            <DiaRegistro onUpdate={handleDia}/>
            {estadoConsumo!==null && (<h1>{estadoConsumo} segundos</h1>)}
        </div>
    )
}

export default withStyles(styles)(Consumo);