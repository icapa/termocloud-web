import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography}from '@material-ui/core'
import {Schedule} from '@material-ui/icons';


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
        justifyContent:'space-around'
        //margin: theme.spacing.unit *0.5 ,
        //padding: theme.spacing.unit *0.5
    },
});



function EstadoRegistro(props){
    
    const {classes,elRegistro} = props;
    
    function GeneraRegistro(){
        
        var texto="Días: ";
        if (elRegistro.id===undefined) return "";
        var losDias=[];
        if (!elRegistro) return "";
        if (elRegistro.L) losDias.push("L");
        if (elRegistro.M) losDias.push("M");
        if (elRegistro.X) losDias.push("X");
        if (elRegistro.J) losDias.push("J");
        if (elRegistro.V) losDias.push("V");
        if (elRegistro.S) losDias.push("S");
        if (elRegistro.D) losDias.push("D");
        losDias.forEach(element => {
            texto += element;
        });
        texto += ", " + elRegistro.hh_ii;
        texto += " a " + elRegistro.hh_ff;
        if (elRegistro.estadoForm==="automatico"){
            texto += ", Tº: " + elRegistro.temperatura;
        }
        else if (elRegistro.estadoForm==="on"){
            texto += ", On";
        }else{
            texto += ", Off";
        }
        return texto;

    }

    var pintoIcono="";
    if (elRegistro.id) pintoIcono=<Schedule/>;
    
    return(
        
        
        <div className={classes.listaBotones}>
            {pintoIcono}
            <Typography variant='h7'>{GeneraRegistro()}</Typography>
        </div>
        
    );

}

export default withStyles(styles)(EstadoRegistro);