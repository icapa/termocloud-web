import React from 'react';
import {Typography}from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import EstadoRegistro from './EstadoRegistro';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit *2,
    },
    imagen:{
        borderRadius:30
    }
});

function Status(props){
    const {classes,estado,registro} = props;
    
    const renderFecha =()=>{
        if (estado){
            let fechaOrig = estado.fecha
            if (fechaOrig){
                var partes = fechaOrig.split("T");
                var hora = partes[1].split("+")
                return (
                    <div>
                        <Typography variant='h5' align='center' gutterBottom>
                        {hora[0]}
                        </Typography>
                        <Typography variant='subtitle1' align='center' gutterBottom>
                        {partes[0]}
                        </Typography>
                    </div>
                    )
            }
        }
    }
    const renderImagen=()=>{
        if (estado){
            if (estado.encendido===1){
                return "fuego.gif"
            }else{
                return "fuego_apagado.gif"
            }
        }
    }
    const renderTemperatura= ()=>{
        if (estado){
            if (estado.temperatura)
                return estado.temperatura+' ºC';
            else
                return '';
            
        }
        return ''
    }
    const renderEstadoRegistro = ()=>{
        if (registro){
            return <EstadoRegistro elRegistro={registro}/>
        }
        else return (<></>)
    }
            
    return(
            
        <div>
            
            <center><img width="100" height="100" alt="" className={classes.imagen} src={renderImagen()} /></center>
            
            <Typography variant='h4' align='center' gutterBottom>
                {renderTemperatura()}
            </Typography>
           
            {renderFecha()}
            
            {renderEstadoRegistro()}
            
            
            

            
        </div>
        );
    }



export default withStyles(styles)(Status);


