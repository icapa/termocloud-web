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

class Status extends React.Component {
    renderFecha(){
        if (this.props.estado){
            let fechaOrig = this.props.estado.fecha
            if (fechaOrig){
                var partes = fechaOrig.split("T");
                var hora = partes[1].split("+")
                return (partes[0] + ' ' + hora[0])
            }
        }
    }
    renderImagen(){
        if (this.props.estado){
            if (this.props.estado.encendido===1){
                return "fuego.gif"
            }else{
                return "fuego_apagado.gif"
            }
        }
    }
    renderTemperatura(){
        if (this.props.estado){
            if (this.props.estado.temperatura)
                return this.props.estado.temperatura+' ºC';
            else
                return '';
            
        }
        return ''
    }
    render(){
        
        const {classes} = this.props;
        
        
        return(
            
            <div>
                
                <center><img width="100" height="100" alt="" className={classes.imagen} src={this.renderImagen()} /></center>
                
                <Typography variant='display1' align='center' gutterBottom>
                    {this.renderTemperatura()}
                </Typography>
                {/*
                <Typography variant='h5' align='center' gutterBottom>
                    {this.props.estado.temperaturaObjetivo}ºC
                </Typography>
                */}
                

                <Typography variant='h6' align='center' gutterBottom>
                    {this.renderFecha()}
                </Typography>
                <EstadoRegistro elRegistro={this.props.registro}/>
                
            </div>
        );
    }
}


export default withStyles(styles)(Status);


