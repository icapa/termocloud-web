import React from 'react';
import * as firebase from 'firebase'

import Status from './Status'
import Control from './Control'
import {Paper}from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

var config = require('../config/firebase_conf').firebase


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit *2,
        flex:1,
        alignItems:'center'
    },
    separador:{
        align:'center',
        
    }
});

firebase.initializeApp(config);

var nameRef = firebase.database().ref();
var idRef = firebase.database().ref();
var controlRef = firebase.database().ref();

export default withStyles(styles)(
class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            serial:'',
            estado:{
            },
            id : {
            },
            control:{
            }
        }
        this.onCambiaModo = this.onCambiaModoFunc.bind(this);
        this.onCambiaTemperatura = this.onCambiaTemperaturaFunc.bind(this);
    }

    onCambiaTemperaturaFunc(temp){
        console.log("La temperatura quiere cambiar: "+temp);
        var refTemp = firebase.database().ref(this.state.serial+'/control/automatico/temperatura')
        refTemp.set(temp);

    }
    onCambiaModoFunc(modo){
        console.log("El control quiere cambiar: "+modo.toLowerCase());
        if (this.state.serial){
            var refModo = firebase.database().ref(this.state.serial+'/control/modo');
            refModo.set(modo.toLowerCase())
        }
    }

    componentDidMount(){
        nameRef.on('value',snapshot =>{
            console.log(Object.keys(snapshot.val())[0])
            this.setState({
                serial: Object.keys(snapshot.val())[0]
            })
            nameRef = firebase.database().ref(Object.keys(snapshot.val())[0]+'/'+'estado')
            nameRef.on('value',snapshot =>{
                this.setState({
                    estado: snapshot.val()
                })
            })
            idRef = firebase.database().ref(Object.keys(snapshot.val())[0]+'/'+'id')
            idRef.on('value',snapshot =>{
                this.setState({
                    id: snapshot.val()
                })
            })
            controlRef = firebase.database().ref(Object.keys(snapshot.val())[0]+'/'+'control')
            controlRef.on('value',snapshot =>{
                this.setState({
                    control: snapshot.val()
                })

            })
        })
    }


    render(){
        
        const {classes} = this.props;
        return (


          <Paper className={classes.root} elevation={1}>
                <Status estado={this.state.estado} />
                <div className ={classes.separador}>
                <Control control={this.state.control} 
                    onCambiaModo={this.onCambiaModo}
                    onCambiaTemperatura={this.onCambiaTemperatura}
                    />
                </div>
          </Paper>

        );
    }
}
)