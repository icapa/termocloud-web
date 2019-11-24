import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'react';
import DiaRegistro from './DiaRegistro'

import {MomentoAFecha,FechaAMomento} from '../Controladores/Fechas';
import {consumoEnIntervalo} from '../Controladores/ConsumoControl';
import {DateRange} from 'react-date-range'
import {
    BarChart, Bar, LabelList,Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

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
        consumoEnIntervalo(estadoFecha.inicio,estadoFecha.final)
        .then((consumo)=>{
            setEstadoConsumo(consumo)
        })
    },[estadoFecha]);
    


    const handleDia = (dia)=>{  
        setEstadoFecha({
            inicio:MomentoAFecha(dia.startDate),
            final:MomentoAFecha(dia.endDate)
        });
    }
    return (

        <div>
            <DateRange
                firstDayOfWeek = {1}
                lang = "es"
                calendars = "1"
                onInit = {handleDia}
                onChange = {handleDia}
            />
            {/*estadoConsumo!==null && (<h1>{estadoConsumo} segundos</h1>)*/}
            <BarChart
                width={300}
                height={250}
                data={estadoConsumo}
                margin={{
                top: 15, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="X" />
                <YAxis dataKey="Y"/>
                <Label offset={0} position="center"/>
                <Tooltip />
                <Bar dataKey="Y" fill="#8884d8">
                    {/*
                    <LabelList dataKey="Y" position="top" />
                    */}
                    
                </Bar>
            </BarChart>
        </div>
    )
}

export default withStyles(styles)(Consumo);