import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'react';

var moment = require('moment');

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit *2,
        flex:1,
        alignItems:'center',
        backgroundColor:'blue',
        flexDirection:'column'
    },
    listaBotones: {
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
});



function Consumo(props){
    
    const {classes, item} = props;
    
    function MomentoAFecha(fecha){
        return fecha.format().split('T')[0];
    }

    
    if (item){
        return(
        
        <div className={classes.listaBotones}>
            
            <Typography>{item.id}</Typography>
        
        </div>
        );
    }
    else{
        return (<div><Typography>Aqui pinto el consumo</Typography></div>);
    }

}

export default withStyles(styles)(Consumo);