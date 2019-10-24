import React,{useContext} from 'react'
import * as firebase from 'firebase'


/* Tema de autenticacion */
export const userContext = React.createContext({
    user:null,
})

export const useSession = () =>{
    const {user} = useContext(userContext)
    return user
}
export const useAuth = () => {
    const [state, setState] = React.useState(() => { 
      const user = firebase.auth().currentUser 
      return { initializing: !user, user, } 
  })
  
  function onChange(user) {
    setState({ initializing: false, user })
  }

  React.useEffect(() => {
   
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}

  