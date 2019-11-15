import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'react';
import DiaRegistro from './DiaRegistro'

import {bbddGetLastItemFromEvent,bbddGetAllEvents} from '../Controladores/cloud';
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
        const diaAntes=FechaAMomento(estadoFecha).add(-1,'days');
        console.log("Consumo: Cambiamos dia " + estadoFecha);
        console.log(diaAntes);
        console.log(MomentoAFecha(diaAntes));
        bbddGetLastItemFromEvent( MomentoAFecha(diaAntes),(item)=>{
            if (item){
                console.log("Consumo, item anterior:" + item.encendido);
                bbddGetAllEvents(estadoFecha,(items)=>{
                    const con=consumoGetTotal(item.encendido,items);
                    setEstadoConsumo(con);
                    console.log("Consumo:Cambiaron los estados, consumo: " + con);
                })
            }
            
        });
    },[estadoFecha]);
    
    
    

    const handleDia = (dia)=>{    
        setEstadoFecha(dia);
        /*
        const diaAntes=FechaAMomento(dia).add(-1,'days');
        console.log("Consumo: Cambiamos dia " + dia);
        console.log(diaAntes);
        console.log(MomentoAFecha(diaAntes));
        bbddGetLastItemFromEvent( MomentoAFecha(diaAntes),(item)=>{
            if (item){
                console.log("Consumo, item anterior:" + item.encendido);
                setEstadoCaleAnterior(item.encendido);
            }
            setEstadoFecha(dia);
        });
        */
        
    }
    return (
        <div>
        <DiaRegistro onUpdate={handleDia}/>
            {estadoConsumo!==null && (<h1>{estadoConsumo} segundos</h1>)}
        </div>
    )
}

export default withStyles(styles)(Consumo);