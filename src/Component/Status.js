import React from 'react';
import {Typography, Paper}from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit *2,
    },
});

class Status extends React.Component {
    renderFecha(){
        let fechaOrig = this.props.estado.fecha
        if (fechaOrig){
            var partes = fechaOrig.split("T");
            var hora = partes[1].split("+")
            return (partes[0] + ' ' + hora[0])
        }
       
    }
    renderImagen(){
        if (this.props.estado.encendido===1){
            return "fuego.gif"
        }else{
            return "fuego_apagado.gif"
        }
    }
    render(){
        
        const {classes} = this.props;
        return(
            
            <div>
                <Paper className={classes.root}>
                <center><img width="100" height="100" alt="" src={this.renderImagen()} /></center>
                
                <Typography variant='display1' align='center' gutterBottom>
                    {this.props.estado.temperatura}ºC
                </Typography>
                <Typography variant='h5' align='center' gutterBottom>
                    {this.props.estado.temperaturaObjetivo}ºC
                </Typography>
                <Typography variant='h6' align='center' gutterBottom>
                    {this.renderFecha()}
                </Typography>
                </Paper>
            </div>
        );
    }
}


export default withStyles(styles)(Status);


