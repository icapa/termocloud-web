import React from 'react';
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

class Control extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //temperatura: Object.values(props.control.automatico)[0]
            temperatura: 20
        }
    }
    componentWillReceiveProps(props){
        if (!props.control) return;
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
        
        
        if (this.props.onCambiaModo){
            this.props.onCambiaModo(params);
        }
        
    }

    renderInput(){
        if (!this.props.control) return;
        const {classes} = this.props;
        if (this.props.control.modo==="automatico"){
            return(
                <div className={classes.controlTemp}>
                <IconButton variant="contained" onClick={()=>{this.sumaTemp()}}> 
                    <AddCircle/>
                </IconButton>
                <Typography variant='display1' align='center' gutterBottom>
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
        if (!this.props.control) return;
        const {classes}= this.props;
        if (this.props.control.modo==="on"){
            styleOn = "primary";
            styleOff = "default";
            styleAuto = "default";
        }else if (this.props.control.modo==="off"){
            styleOn = "default"
            styleOff = "primary";
            styleAuto = "default";
        }else if (this.props.control.modo==="automatico"){
            styleOn = "default";
            styleOff = "default";
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
                    Auto
                </Button>
            </div>
        );
    }


    render(){
        const {classes} = this.props;
        return(
            <div>
            
            <div className={classes.contenedor}>
                {this.renderBotones()}
                {this.renderInput()}
            </div>
            
            </div>
        );
    }
}

export default withStyles(styles)(Control);