
import * as firebase from 'firebase'
var config = require('../config/firebase_conf').firebase



class Cloud{
    constructor(){
        
        firebase.initializeApp(config);
        this.bbdd=firebase;
    }
    autentica(user,pass){
        firebase.auth().signInWithEmailAndPassword(user,pass).catch(function(error){
            console("Mando auth y que sale??");
            console.log(error);
            alert(error.code);
        });
    }

    creaConfiguracion(id,laConfiguracion){
        var newKey = firebase.database().ref(id+'/conf/').push().key;
        var updates={};
        updates[id+'/conf/'+newKey] = laConfiguracion;
        return firebase.database().ref().update(updates);
    }
    borraConfiguracion(id,laKey){
        var referencia = firebase.database().ref(id+'/conf/'+laKey);
        referencia.remove();
    }
    actualizaConfiguracion(id,estado){
        var updates={};
        
        
        
        console.log('Actualizando: '+id+'/conf/'+estado.id);
        updates[id+'/conf/'+estado.id] = estado;
        return firebase.database().ref().update(updates);

    }
    
}
export default Cloud;

