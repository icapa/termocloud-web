import React, { useContext,useState, Component,useEffect } from 'react';

//import SimpleTabs from './Component/SimpleTabs'
import CajonPersistente from './Component/CajonPersistente'
import SigIn from './Component/SigIn'
import { withStyles } from '@material-ui/core/styles'

import {useAuth,useSession} from './Controladores/FirebaseContextUser'


import * as firebase from 'firebase'

import {DatabaseContext,useDatabase} from './Controladores/FirebaseDatabaseContext'


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
        /*
        <userContext.Provider value = {{user}}>
          
            
            <CajonPersistente value={{user}} onSigOut={onSigOut}/>
            
        </userContext.Provider>*/
        <DatabaseContext.Provider value={database}>
          <Fuck/>
        </DatabaseContext.Provider>
        
        
        

      )
    }
    else{
      return <SigIn value={{user}} onSigIn={onSigIn}/>
    }
  }
}

const Fuck=()=>{
    const database = useContext(DatabaseContext);
    if (database){
      return(
        <div>
              <p>Bien {database.id}</p>
        </div>
      )
    }
    else{
      return(
        <div>
              <p>No hay na</p>
        </div>
      )
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