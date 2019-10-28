import React from 'react';
import * as firebase from 'firebase'
import Status from './Status'
import Control from './Control'

import { Typography}from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useEffect,useState} from 'react';
import {getDatabaseId} from '../Controladores/cloud'
import { SentimentSatisfied } from '@material-ui/icons';
import {useDatabase,databaseContext} from '../Controladores/FirebaseDatabaseContext'

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
    /* Helpers */

    /* JSX */
    
    if (id===null){
        return(<></>);
    }
    else{
        return(
            <databaseContext.Provider value={{id,estado,control,estadoRegistro}}>
                <main className={classes.main}>
                <Status estado={estado} registro={estadoRegistro}/>     
                </main>
            </databaseContext.Provider>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);