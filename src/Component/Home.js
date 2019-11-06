import React from 'react';
import Status from './Status'
import Control from './Control'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import {DatabaseContext} from '../Controladores/FirebaseDatabaseContext'
import {useContext} from 'react';

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
   
    const database = useContext(DatabaseContext);
    
    //const state = useContext(DatabaseContext);

    

    
    //const {id,estado,control,estadoRegistro} = useDataBaseSession()
    /* Handlers */
    const onCambiaTemperatura=(temp)=>{
        bbddCambiaTemperaturaObjetivo(temp);
    }
    const onCambiaModo=(modo)=>{
       bbddCambiaModo(modo);
    }

    /* JSX */
    
    if (database==null){
        return(
            <div className={classes.root}>
            <center><CircularProgress /></center>
            
          </div> 
        );
    }
    else{
        
        return(
                
                <main className={classes.main}>
               
                
                
                <Status estado={database.estado} registro={database.estadoRegistro}/>     
                <Control 
                    estado={database.estado} 
                    control={database.control}
                    onCambiaTemperatura={onCambiaTemperatura}
                    onCambiaModo={onCambiaModo}
                />
                </main>
            
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);