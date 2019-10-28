import React from 'react';
import * as firebase from 'firebase'
import Status from './Status'
import Control from './Control'

import { Typography}from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';




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




export default withStyles(styles)(
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            estado:{
            },
            control:{
            },
            user:{
            },
            info:{
            },
            registro:{

            }
        }
        this.bbdd = this.props.bbdd;
        this.onCambiaModo = this.onCambiaModoFunc.bind(this);
        this.onCambiaTemperatura = this.onCambiaTemperaturaFunc.bind(this);
        
    }
    
    
    onCambiaTemperaturaFunc(temp){
        console.log("La temperatura quiere cambiar: "+temp);
        var firebase = this.bbdd;
        var refTemp = firebase.bbdd.database().ref(this.state.id+'/control/automatico/temperatura')
        refTemp.set(temp);

    }
    onCambiaModoFunc(modo){
        console.log("El control quiere cambiar: "+modo.toLowerCase());
        if (this.state.id){
            var firebase = this.bbdd;
            console.log("Se quiera cambiar: ");
            console.log(this.state);
            var refModo = firebase.bbdd.database().ref(this.state.id+'/control/modo');
            refModo.set(modo.toLowerCase())
        }
    }


    componentDidMount(){
        var firebase = this.bbdd;
        /* Recogemos el id */
        firebase.bbdd.database().ref().on('value',snapshot=>{
            
            var id=Object.keys(snapshot.val())[0];
            console.log("El HOME id: ", id);
            this.setState({
                id:id
            });
            var estadoRef=firebase.bbdd.database().ref(id+'/estado');
            estadoRef.on('value',snapshot=>{
                let elEstado = snapshot.val();
                this.setState({
                    estado: elEstado
                    
                })
                
                firebase.bbdd.database().ref(id+'/conf/'+elEstado.registro).once('value').then((snapshot)=>{
                    this.setState({
                        registro: snapshot.val()
                    })
                });
                
            })
            var infoRef=firebase.bbdd.database().ref(id+'/id');
            infoRef.on('value',snapshot=>{
                this.setState({
                    info: snapshot.val()
                })
            })
            var controlRef = firebase.bbdd.database().ref(id+'/control');
            controlRef.on('value',snapshot=>{
                this.setState({
                    control: snapshot.val()
                })
            })
        })
    }

        

    render(){
        
        
        
        return (
            
            <div>
            <Typography variant='h6' align='center' gutterBottom>
                {this.state.info.lugar}
            </Typography>
            <div>
                <div>
                <Status estado={this.state.estado} registro={this.state.registro}/>
                </div>
                <div>
                    <Control control={this.state.control} estado={this.state.estado} 
                        onCambiaModo={this.onCambiaModo}
                        onCambiaTemperatura={this.onCambiaTemperatura}/>
                </div>
            </div>
            </div>
        );
        
    }
}
)