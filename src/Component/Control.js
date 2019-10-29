import React, { useEffect,useState } from 'react';
import {Button , IconButton, Typography}from '@material-ui/core'
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit *2,
        flex:1,
        alignItems:'center'
    },
    texto:{
        maxWidth:70,
    },
    button: {
      
        
    },
    listaBotones: {
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        margin: theme.spacing.unit *0.5 ,
        padding: theme.spacing.unit *0.5
    },
    controlTemp:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin: theme.spacing.unit*0.5  ,
        padding: theme.spacing.unit *0.5
    },
    contenedor:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        margin: theme.spacing.unit*0.5,
        padding: '20px'
    }
});

function Control(props) {
    
    /* Propiedades */
    const {classes,estado,control,onCambiaTemperatura,onCambiaModo} = props;
    
    /* Estados */
    const [temperaturaObjetivo,setTemperaturaObjetivo] = useState(null);
   
    useEffect(()=>{
        if (estado && control){
            if (control.automatico){
                setTemperaturaObjetivo(estado.temperaturaObjetivo);
            }
        }
    },[estado,control])

    const cambiaTemp = (inc)=>{
        var temp = temperaturaObjetivo+inc
        setTemperaturaObjetivo(temp)
        if (onCambiaTemperatura){
            onCambiaTemperatura(temp);
        }
    }
    

    const renderInput = ()=>{
        if (!control) return;
       
        if (control.modo==="automatico"){
            return(
                <div className={classes.controlTemp}>
                <IconButton variant="contained" onClick={()=>{cambiaTemp(1)}}> 
                    <AddCircle/>
                </IconButton>
                <Typography variant='body1' align='center' gutterBottom>
                    {estado.temperaturaObjetivo} ºC  
                </Typography>
                <IconButton variant="contained" onClick={()=>{cambiaTemp(-1)}}> 
                    <RemoveCircle/>
                </IconButton>
        
            </div>
        )}
       
   }

   const renderBotones=()=>{
        var styleOn;
        var styleOff;
        var styleAuto;
        if (!control) return;
        if (control.modo==="on"){
            styleOn = "primary";
            styleOff = "default";
            styleAuto = "default";
        }else if (control.modo==="off"){
            styleOn = "default"
            styleOff = "primary";
            styleAuto = "default";
        }else if (control.modo==="automatico"){
            styleOn = "default";
            styleOff = "default";
            styleAuto = "primary";
        }
        return(
            <div className={classes.listaBotones}>
                <Button variant="contained" color={styleOn} className={classes.button }
                    onClick={()=>{
                        if (onCambiaModo) onCambiaModo("on")
                    }}
                >
                    On
                </Button>
                <Button variant="contained" color={styleOff} className={classes.button}
                    onClick={()=>{
                        if (onCambiaModo) onCambiaModo("off");
                    }}
                >
                    Off
                </Button>
                <Button variant="contained" color={styleAuto} className={classes.button}
                    onClick={()=>{
                        if(onCambiaModo) onCambiaModo("automatico");
                    }}
                >
                    Auto
                </Button>
            </div>
        );
    }


    
    return(
        <div>    
            <div className={classes.contenedor}>
                {renderBotones()}
                {renderInput()}
            </div>
        </div>
    );
    
}

export default withStyles(styles)(Control);