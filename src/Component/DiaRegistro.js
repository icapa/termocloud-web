import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import {KeyboardArrowRight,KeyboardArrowLeft} from '@material-ui/icons';
import { Typography}from '@material-ui/core'

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
    

   

    function MomentoAFecha(){
        return fecha.format().split('T')[0];
    }

    function sumaDia(){
        setCount(count+1);
        setFecha(fecha.add(1,'days'));
        if (onUpdate){
            onUpdate(MomentoAFecha());
        }
    }
    function restaDia(){    
        setCount(count-1);
        setFecha(fecha.add(-1,'days'));
        if (onUpdate){
            onUpdate(MomentoAFecha());
        }

    }

    return(
        <div className={classes.listaBotones}>
            <IconButton onClick={restaDia}>
                <KeyboardArrowLeft/>
            </IconButton>
            <Typography variant='h5'>{MomentoAFecha()}</Typography>
            <IconButton onClick={sumaDia}>
                <KeyboardArrowRight />
            </IconButton>
        </div>
        
    );

}

export default withStyles(styles)(DiaRegistro);
