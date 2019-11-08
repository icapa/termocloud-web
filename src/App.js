import React, { useContext,useState, Component,useEffect } from 'react';

//import SimpleTabs from './Component/SimpleTabs'
import CajonPersistente from './Component/CajonPersistente'
import SigIn from './Component/SigIn'
import { withStyles } from '@material-ui/core/styles'

import {useAuth,userContext} from './Controladores/FirebaseContextUser'


import * as firebase from 'firebase'

import {DatabaseContext,useDatabase} from './Controladores/FirebaseDatabaseContext'


var config = require('./config/firebase_conf').firebase

export const version = "1.0";


const styles={
  root: {
    margin: 10,
    padding: 10,
    maxWidth:200
  }
}

firebase.initializeApp(config)



function App(){
    
  const {initializing,user} = useAuth()
  const database = useDatabase();

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
            <DatabaseContext.Provider value={database}>
              <CajonPersistente value={{user}} onSigOut={onSigOut}/>
            </DatabaseContext.Provider>
        </userContext.Provider>
      )
    }
    else{
      return <SigIn value={{user}} onSigIn={onSigIn}/>
    }
  }
}


export default withStyles(styles)(App);
