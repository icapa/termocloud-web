import React, { Component, useEffect } from 'react';

//import SimpleTabs from './Component/SimpleTabs'
import CajonPersistente from './Component/CajonPersistente'
import SigIn from './Component/SigIn'
import { withStyles } from '@material-ui/core/styles'

import {useAuth,userContext,useSession} from './Controladores/FirebaseContextUser'
import * as firebase from 'firebase'


var config = require('./config/firebase_conf').firebase


const styles={
  root: {
    margin: 20,
    padding: 20,
    maxWidth:200
  }
}

firebase.initializeApp(config)

function App(){
    
  const {initializing,user} = useAuth()
  
  const onSigIn = (user,pass) =>{
    firebase.auth().signInWithEmailAndPassword(user,pass).catch(function(error){
      console("Mando auth y que sale??");
      console.log(error);
      alert(error.code);
    });
  }
  const onSigOut = () =>{
    firebase.auth().signOut().then(()=>{
      console.log("Cerrando sesión");
    }).catch(()=>{
      console.log("Error cerrando sesión");
    })
  }

  if (initializing){
    return <div>Loading</div>
  }
  else{
    
    if (user){
      return(
        <userContext.Provider value = {{user}}>
          <CajonPersistente value={{user}} onSigOut={onSigOut}/>
        </userContext.Provider>
      )
    }
    else{
      return <SigIn value={{user}} onSigIn={onSigIn}/>
    }
  }
  
}


export default withStyles(styles)(App);
/*
export default withStyles(styles)(
  class App extends Component {
    render() {
      return (
        <CajonPersistente />
      );
    }
  }
  )
*/