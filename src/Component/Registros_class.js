import React, { useState,useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';



import DiaRegistro from './DiaRegistro'
import ItemRegistro from './ItemRegistro'
//import { Typography } from '@material-ui/core';

var moment = require('moment');

const styles = theme => ({
    root: {
        //...theme.mixins.gutters(),
        //paddingTop: theme.spacing.unit * 2,
        //paddingBottom: theme.spacing.unit *2,
        flex:1,
        alignItems:'center',
        margin:0,
        padding:0
        
    },
    separador:{
        align:'center',
        
    },
    cabecera:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'lightGray'
    },
    table:{
        minWidth:400,
        width:'100%'
    }
});



function Registros(props){
    const {classes, bbdd} = props;
    const [items, setItems] = useState([]);
    const [id,setId] = useState(-1);

    console.log("La base de datos es:",bbdd);
    var hoy = moment().format().split('T')[0];
    var escucha;

    useEffect(() =>{
        console.log("Entro en el useEffect!!!",hoy);

        if (bbdd){
            var firebase = bbdd.bbdd;
            firebase.database().ref().once('value',snapshot=>{
                var idAux=Object.keys(snapshot.val())[0];
                setId(idAux);
                escucha = firebase.database().ref(idAux.toString()+'/eventos/'+hoy+'/');
                escucha.on('value',snapshot=>{
                    var auxReg=[];
                    snapshot.forEach(function(child){
                        var item = child.val();
                        item.id = child.key;    
                        auxReg.push(item);
                    });
                    console.log(auxReg);
                    setItems(auxReg);
                })
                
            });
        }
    },[]);
    
    

    function onUpdateFecha(fecha){
        var firebase = bbdd.bbdd;
        console.log("Actualizamos fecha y leemos en ",id,fecha);
        escucha = firebase.database().ref(id.toString()+'/eventos/'+fecha+'/');
            escucha.on('value',snapshot=>{
                var auxReg=[];
                snapshot.forEach(function(child){
                    var item = child.val();
                    item.id = child.key;    
                    auxReg.push(item);
                });
                console.log(auxReg);
                setItems(auxReg);
        })
    }



    return(
        <div className={classes.root}>
            <DiaRegistro  onUpdate={onUpdateFecha}/>
                <div>
                <div className={classes.cabecera}>
                    <div align="center" style={{width:'25%'}}><span>Hora</span></div>
                    <div align="center" style={{width:'5%'}}><span>On</span></div>
                    <div align="center" style={{width:'40%'}}><span>Modo</span></div>
                    <div align="center" style={{width:'15%'}}><span></span>Tª</div>
                    <div align="center" style={{width:'15%'}}><span></span>TªObj</div>
                </div>
                </div>

            {items.map((c,index) => 
                <div key={index.toString()}>
                    <ItemRegistro item={c} />
                </div>
            )}
                    
        </div>
        
    );

}

export default withStyles(styles)(Registros);

