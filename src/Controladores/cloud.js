
import * as firebase from 'firebase'

//var config = require('../config/firebase_conf').firebase

export  const  getDatabaseId = (handler)=>{
    let ref = firebase.database().ref()
    ref.once("value")
    .then(function(snapshot){
        var id=Object.keys(snapshot.val())[0];
        handler(id)
    })  
    return ref;
}
export const eventoEstado = (id,handler) =>{
    let ref = firebase.database().ref(id+'/estado')
    ref.on("value",(snapshot)=>{
       handler(snapshot.val());
    })
    return ref;
}
export const eventoEstadoRegistro = (id,registro,handler) =>{
    let ref = firebase.database().ref(id+'/conf/'+registro)
    ref.on("value",(snapshot)=>{
        handler(snapshot.val());
    })
    return ref;
}
export const eventoControl = (id,handler) =>{
    let ref = firebase.database().ref(id+'/control')
    ref.on("value",(snapshot)=>{
        handler(snapshot.val());
    })
    return ref;
}
export const bbddCambiaModo=(modo)=>{
    getDatabaseId((id)=>{
        var refModo = firebase.database().ref(id+'/control/modo');
        refModo.set(modo.toLowerCase())
    })
    
}
export const bbddCambiaTemperaturaObjetivo=(temperatura)=>{
    getDatabaseId((id)=>{
        var refTemp = firebase.database().ref(id+'/control/automatico/temperatura')
        refTemp.set(temperatura);
    })
}
