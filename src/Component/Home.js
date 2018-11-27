import React from 'react';
import * as firebase from 'firebase'

import Status from './Status'
import Control from './Control'
import SigIn from './SigIn'
import {Paper, Typography}from '@material-ui/core'
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
            },
            user:{
            }
        }
        this.onCambiaModo = this.onCambiaModoFunc.bind(this);
        this.onCambiaTemperatura = this.onCambiaTemperaturaFunc.bind(this);
        this.onSigIn = this.onSigInFunc.bind(this);
    }
    
    onSigInFunc(user,pass){
        
        firebase.auth().signInWithEmailAndPassword(user,pass).catch(function(error){
            console("Mando auth y que sale??");
            console.log(error);
            alert(error.code);
        });
        
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
        
        firebase.auth().onAuthStateChanged(user =>{
            if (user){
                console.log("Usuario autenticado!!!");
                console.log(user.email);
                this.setState({
                    user: user
                })
            }else{
                console.log("NOO AUTH");
            }
        });
        

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

        if (this.state.user.uid){
            return (
                <div>
                <Typography variant='h6' align='center' gutterBottom>
                    {this.state.user.email}
                </Typography>
                <Paper className={classes.root} elevation={1}>
                    <div>
                    <Status estado={this.state.estado} />
                    </div>
                    <div elevation={1}>
                        <Control control={this.state.control} 
                            onCambiaModo={this.onCambiaModo}
                            onCambiaTemperatura={this.onCambiaTemperatura}/>
                    </div>
                </Paper>
                </div>
            );
        }else{
            return(
                <SigIn onSigIn ={this.onSigIn} />
            );
        }
    }
}
)