import React from 'react';

//import SimpleTabs from './Component/SimpleTabs'
import CajonPersistente from './Component/CajonPersistente'
import SigIn from './Component/SigIn'
import { withStyles } from '@material-ui/core/styles'

import {useAuth,userContext} from './Controladores/FirebaseContextUser'

import CircularProgress from '@material-ui/core/CircularProgress';

import * as firebase from 'firebase'

import {DatabaseContext,useDatabase} from './Controladores/FirebaseDatabaseContext'


var config = require('./config/firebase_conf').firebase

export const version = "1.0";


const styles = theme => ({
  root: {
    height:"100%",
  },
  logo:{
   
    margin:0,
    height:"100vh"
  },

});

firebase.initializeApp(config)



function App(props){
  const {classes} = props;
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
    return (
    
      <div className={classes.logo}>
        <center><img width="100%" alt="" src="logo.jpg" /></center>
        <center><CircularProgress /></center>
      </div>
    
    )
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
