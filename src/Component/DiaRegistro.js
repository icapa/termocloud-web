import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {KeyboardArrowRight,KeyboardArrowLeft} from '@material-ui/icons';
import { Typography}from '@material-ui/core'
import {MomentoAFecha} from '../Controladores/Fechas'

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
        justifyContent:'space-around'
        //margin: theme.spacing.unit *0.5 ,
        //padding: theme.spacing.unit *0.5
    },
});



function DiaRegistro(props){
    const [fecha, setFecha] = useState(moment());
    const [count, setCount] = useState(0);
    const {classes, onUpdate} = props;
    

   

    

    function sumaDia(){
        setCount(count+1);
        const newFecha = fecha.add(+1,'days')
        setFecha(newFecha);
        if (onUpdate){
            onUpdate(MomentoAFecha(newFecha));
        }
    }
    function restaDia(){    
        setCount(count-1);
        const newFecha = fecha.add(-1,'days')
        setFecha(newFecha);
        if (onUpdate){
            onUpdate(MomentoAFecha(newFecha));
        }

    }

    return(
        <div className={classes.listaBotones}>
            <IconButton onClick={restaDia}>
                <KeyboardArrowLeft/>
            </IconButton>
            <Typography variant='h5'>{MomentoAFecha(fecha)}</Typography>
            <IconButton onClick={sumaDia}>
                <KeyboardArrowRight />
            </IconButton>
        </div>
        
    );

}

export default withStyles(styles)(DiaRegistro);
