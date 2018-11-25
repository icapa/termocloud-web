import React from 'react';
import * as firebase from 'firebase'

import Status from './Status'
import Control from './Control'
var config = require('../config/firebase_conf').firebase
/*
var config = {
    apiKey: "AIzaSyCekjkHVtlbKDrEqJMqDatNRcAg920rld4",
    authDomain: "termocloud-icapa.firebaseapp.com",
    databaseURL: "https://termocloud-icapa.firebaseio.com",
    projectId: "termocloud-icapa",
    storageBucket: "termocloud-icapa.appspot.com",
    messagingSenderId: "691857590336"
  };
*/

firebase.initializeApp(config);

var nameRef = firebase.database().ref();
var idRef = firebase.database().ref();
var controlRef = firebase.database().ref();

export default class Home extends React.Component {
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
        const style ={
            display:'flex',
            flex:1,
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'

        }

        return (


          <div>
                <Status estado={this.state.estado} />
                <Control control={this.state.control} 
                    onCambiaModo={this.onCambiaModo}
                    onCambiaTemperatura={this.onCambiaTemperatura}
                    />
          </div>

        );
    }
}