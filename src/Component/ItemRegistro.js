import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import {IconButton} from '@material-ui/core';
//import {KeyboardArrowRight,KeyboardArrowLeft, IndeterminateCheckBox} from '@material-ui/icons';
//import { Typography}from '@material-ui/core'

//var moment = require('moment');

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
        paddingBottom: theme.spacing.unit *0.5,
        boxShadow: ["inset 0px 0px 3px blue"],
        //justifyContent:'space-around'
        //margin: theme.spacing.unit *0.5 ,
        //padding: theme.spacing.unit *0.5
    },
    filaEncendida :{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'red',
        margin:'2px',
    },
    filaApagada :{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        margin:'2px',
        
    },
    filaApagadaAuto :{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'cyan',
        margin:'2px',
    },
    filaEncendidaAuto :{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'orange',
        margin:'2px',
    },
});



function ItemRegistro(props){
    
    const {classes, item,tipo} = props;
    
    /*
    const MomentoAFecha =  (fecha)=>{
        return fecha.format().split('T')[0];
    }
    */
   
    const estiloPorEstado = (item)=>{
        if (item.encendido===0){
            if (item.modo==="off"){
                return(classes.filaApagada);
            }
            else{
                return(classes.filaApagadaAuto);
            }
        }
        else if(item.encendido===1){
            if (item.modo==="on"){
                return (classes.filaEncendida);
            }else{
                return(classes.filaEncendidaAuto);
            }
            
        }
   
    }
    const renderEventos = ()=>{
        return(
        <div className={estiloPorEstado(item)}>
            <div align="center" style={{width:'25%'}}><span>{item.id}</span></div>
            <div align="center" style={{width:'5%',align:'center'}}><span>{item.encendido}</span></div>
            <div align="center" style={{width:'40%',align:'center'}}><span>{item.modo}</span></div>
            <div align="center" style={{width:'15%'}}><span>{item.temperatura}</span></div>
            <div align="center" style={{width:'15%'}}><span>{item.temperaturaObjetivo}</span></div>
        </div>
        );
    }
    const renderRegistros = ()=>{
        return(
        <div className={classes.listaBotones}>
            <div align="center" style={{width:'40%'}}><span>{item.id}</span></div>
            <div align="center" style={{width:'30%'}}><span>{item.temperatura}</span></div>
            <div align="center" style={{width:'30%'}}><span>{item.temperaturaObjetivo}</span></div>
        </div>
        );
    }

    
    if (item){
        if (tipo==="eventos"){
            return(renderEventos());
        }
        else if (tipo==="registros"){
            return(renderRegistros());
        }
        else{
            return (<div></div>); 
        }
    }
    else{
        return (<div></div>);
    }

}

export default withStyles(styles)(ItemRegistro);