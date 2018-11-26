import React from 'react';
import {Button , IconButton, TextField,Paper}from '@material-ui/core'
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
        maxWidth:100,
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
                temperatura:Object.values(props.control.automatico)[0]
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
                <div style={styles.main_div}>
                <IconButton variant="contained" onClick={()=>{this.sumaTemp()}}> 
                    <AddCircle/>
                </IconButton>
                <TextField
                    className={classes.texto}
                    id="outlined-adornment-weight"
                    variant="outlined"
                    value={this.state.temperatura}
                    width="50"
                    textAlign="center"
                />
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
        if (this.props.control.modo==="on"){
            styleOn = "primary";
            styleOff = "secundary";
            styleAuto = "secundary";
        }else if (this.props.control.modo==="off"){
            styleOn = "secundary"
            styleOff = "primary";
            styleAuto = "secundary";
        }else if (this.props.control.modo==="automatico"){
            styleOn = "secundary";
            styleOff = "secundary";
            styleAuto = "primary";
        }
        return(
            <div>
                <Button variant="contained" color={styleOn} id="on"
                    onClick={()=>{this.onChange("on");}}
                >
                    On
                </Button>
                <Button variant="contained" color={styleOff} 
                    onClick={()=>{this.onChange("off");}}
                >
                    Off
                </Button>
                <Button variant="contained" color={styleAuto} 
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
            <Paper className={classes.root}>
                {this.renderBotones()}
                {this.renderInput()}
            </Paper>
        );
    }
}

export default withStyles(styles)(Control);