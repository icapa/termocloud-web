import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'react';
import DiaRegistro from './DiaRegistro'

import {bbddGetLastItemFromEvent,bbddGetAllEvents} from '../Controladores/cloud';
import {MomentoAFecha,FechaAMomento} from '../Controladores/Fechas';
import {consumoGetTotal} from '../Controladores/ConsumoControl';

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
    const [estadoFecha,setEstadoFecha] = useState(moment().format().split('T')[0]);
    const [estadoCaleAnterior,setEstadoCaleAnterior] = useState(null);
    const [estadoConsumo,setEstadoConsumo] = useState(0);

    useEffect(() =>{
        const fecha=moment();
        setEstadoFecha(fecha);
        console.log("Registros: Primer paso");
    },[]);

    useEffect(()=>{
        console.log("Consumo:Cambiaron los estados, consumo: " + estadoConsumo);
        debugger;
        if (estadoCaleAnterior){
            bbddGetAllEvents(estadoFecha,(items)=>{
                const con=consumoGetTotal(estadoCaleAnterior,items);
                setEstadoConsumo(con);
            })
        }
    },[estadoFecha,estadoCaleAnterior]);
    
    
    

    const handleDia = (dia)=>{
        console.log(dia);
        const diaAntes=FechaAMomento(dia).add(-1,'days');
        console.log("Consumo: Cambiamos dia " + dia);
        console.log(diaAntes);
        console.log(MomentoAFecha(diaAntes));
        setEstadoFecha(dia);
        bbddGetLastItemFromEvent(MomentoAFecha(diaAntes),(item)=>{
            console.log("Consumo, item anterior:" + item.encendido);
            setEstadoConsumo(0);
            setEstadoCaleAnterior(item.encendido);
        });
        
    }
    return (
        <DiaRegistro onUpdate={handleDia}/>
    )
}

export default withStyles(styles)(Consumo);