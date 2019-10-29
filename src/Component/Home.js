import React from 'react';
import Status from './Status'
import Control from './Control'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useDatabase,databaseContext} from '../Controladores/FirebaseDatabaseContext'

import {bbddCambiaModo,bbddCambiaTemperaturaObjetivo} from '../Controladores/cloud'

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

function Home(props) {
    /* Properties */
    const { classes } = props;
    const {id,estado,control,estadoRegistro} = useDatabase()
    /* Handlers */
    const onCambiaTemperatura=(temp)=>{
        bbddCambiaTemperaturaObjetivo(temp);
    }
    const onCambiaModo=(modo)=>{
       bbddCambiaModo(modo);
    }

    /* JSX */
    
    if (id===null){
        return(<></>);
    }
    else{
        return(
            <databaseContext.Provider value={{id,estado,control,estadoRegistro}}>
                <main className={classes.main}>
                <Status estado={estado} registro={estadoRegistro}/>     
                <Control 
                    estado={estado} 
                    control={control}
                    onCambiaTemperatura={onCambiaTemperatura}
                    onCambiaModo={onCambiaModo}
                />
                </main>
            </databaseContext.Provider>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);