import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import {IconButton} from '@material-ui/core';
//import {KeyboardArrowRight,KeyboardArrowLeft, IndeterminateCheckBox} from '@material-ui/icons';
//import { Typography}from '@material-ui/core'

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
        //justifyContent:'space-around'
        //margin: theme.spacing.unit *0.5 ,
        //padding: theme.spacing.unit *0.5
    },
});



function ItemRegistro(props){
    
    const {classes, item} = props;
    
    
   

    function MomentoAFecha(fecha){
        return fecha.format().split('T')[0];
    }

    
    if (item){
        return(
        
        <div className={classes.listaBotones}>
            <div align="center" style={{width:'25%'}}><span>{item.id}</span></div>
            <div align="center" style={{width:'5%',align:'center'}}><span>{item.encendido}</span></div>
            <div align="center" style={{width:'40%',align:'center'}}><span>{item.modo}</span></div>
            <div align="center" style={{width:'15%'}}><span>{item.temperatura}</span></div>
            <div align="center" style={{width:'15%'}}><span>{item.temperaturaObjetivo}</span></div>
            {/*
            <Typography>{item.encendido}</Typography>
            <Typography>{item.modo}</Typography>
            <Typography>{item.temperatura}</Typography>
            <Typography>{item.temperaturaObjetivo}</Typography>
            */}
        </div>
        );
    }
    else{
        return (<div></div>);
    }

}

export default withStyles(styles)(ItemRegistro);