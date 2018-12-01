import React from 'react';
import {Button , IconButton, Typography,Paper}from '@material-ui/core'
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
        justifyContent:'space-between',
        margin: theme.spacing.unit *0.5 ,
        padding: theme.spacing.unit *0.5
    },
    controlTemp:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
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

class Control extends React.Component {
    constructor(props){
        console.log('los putos props');
        console.log(props)
        super(props)
        this.state = {
            //temperatura: Object.values(props.control.automatico)[0]
            temperatura: 20
        }
    }
    componentWillReceiveProps(props){
        if (props.control.automatico){
            this.setState({
                /*temperatura:Object.values(props.control.automatico)[0]*/
                temperatura: props.estado.temperaturaObjetivo
            })
        }
    }
    sumaTemp(){
        var temp = this.state.temperatura+1
        this.setState({
            temperatura: temp
        }) 
        if (this.props.onCambiaTemperatura){
            this.props.onCambiaTemperatura(temp);
        }
    }
    restaTemp(){
        var temp = this.state.temperatura-1
        this.setState({
            temperatura: temp
        }) 
        if (this.props.onCambiaTemperatura){
            this.props.onCambiaTemperatura(temp);
        }
    }
   
    onChange(params) {
        console.log(params);
        
        if (this.props.onCambiaModo){
            this.props.onCambiaModo(params);
        }
        
    }

    renderInput(){
        const {classes} = this.props;
        if (this.props.control.modo==="automatico"){
            return(
                <div className={classes.controlTemp}>
                <IconButton variant="contained" onClick={()=>{this.sumaTemp()}}> 
                    <AddCircle/>
                </IconButton>
                {/*
                <TextField
                    className={classes.texto}
                    id="outlined-adornment-weight"
                    variant="outlined"
                    value={this.state.temperatura}
                    textAlign="center"
                />
                */}
                <Typography variant='display2' align='center' gutterBottom>
                    {this.state.temperatura} ºC  
                </Typography>
                <IconButton variant="contained" onClick={()=>{this.restaTemp()}}> 
                    <RemoveCircle/>
                </IconButton>
        
            </div>
        )}
       
   }

   renderBotones(){
        var styleOn;
        var styleOff;
        var styleAuto;
        const {classes}= this.props;
        if (this.props.control.modo==="on"){
            styleOn = "primary";
            styleOff = "disabled";
            styleAuto = "disabled";
        }else if (this.props.control.modo==="off"){
            styleOn = "disabled"
            styleOff = "primary";
            styleAuto = "disabled";
        }else if (this.props.control.modo==="automatico"){
            styleOn = "disabled";
            styleOff = "disabled";
            styleAuto = "primary";
        }
        return(
            <div className={classes.listaBotones}>
                <Button variant="contained" color={styleOn} className={classes.button }
                    onClick={()=>{this.onChange("on");}}
                >
                    On
                </Button>
                <Button variant="contained" color={styleOff} className={classes.button}
                    onClick={()=>{this.onChange("off");}}
                >
                    Off
                </Button>
                <Button variant="contained" color={styleAuto} className={classes.button}
                    onClick={()=>{this.onChange("automatico");}}
                >
                    Automatico
                </Button>
            </div>
        );
    }


    render(){
        const {classes} = this.props;
        return(
            <div>
            <Paper className={classes.root}>
            <div className="contenedor">
                {this.renderBotones()}
                {this.renderInput()}
            </div>
            </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Control);