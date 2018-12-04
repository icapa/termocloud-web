import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab'

import CeldaConf from './CeldaConf'
const styles = theme => ({
    celdaPar:{
        backgroundColor:"#c8ccff",
        
    },
    celdaImpar:{
        backgroundColor:"#ffffff",
        
    },
    main:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
        margin: 0 ,
        padding: 0
    }
    
});

class Conf extends React.Component {
    constructor(props){
       
        super(props)
       
        this.state = {
            registros:[
            ],
            id:null
        }
        this.bbdd = this.props.bbdd;
        this.onSubmitConf = this.onSubmitConfFunc.bind(this);
        this.onSubmitDelete = this.onSubmitDeleteFunc.bind(this);
        this.onAddConf = this.addConf.bind(this);
    }
    componentDidMount(){
        /* Cargamos tema de bbdd */
        var firebase = this.bbdd;
        firebase.bbdd.database().ref().on('value',snapshot=>{
            var id=Object.keys(snapshot.val())[0];
            this.setState({
                id:id
            });
            
            var escucha = firebase.bbdd.database().ref(id.toString()+'/conf');
            escucha.on('value',snapshot=>{
                var auxReg=[];
                snapshot.forEach(function(child){
                    var item = child.val();
                    item.id = child.key;
                    
                    auxReg.push(item);
                });
                console.log(auxReg);
                this.setState({
                    registros:auxReg
                })
                }
            )
        });
        
        
    }
    addConf(){
        console.log("Añado un registro nuevo: " + this.state.id);
        console.log(this.state.registros);
        var dummy={ 
            
            hh_ii:"00:00",
            hh_ff:"23:59",
            estadoForm:"off",      
            L:false,
            M:false,
            X:false,
            J:false,
            V:false,
            S:false,
            D:false,
            temperatura: 20,
            enabled: false,
            pintaAceptar: false
        }
        this.bbdd.creaConfiguracion(this.state.id,dummy);
    }
    onSubmitDeleteFunc(id){
        console.log("Borramos elemento: " + id);
        this.bbdd.borraConfiguracion(this.state.id,id);
    }

    onSubmitConfFunc (estado){
        console.log("Actualizamos: Celda!! ");
        console.log(estado);
        this.bbdd.actualizaConfiguracion(this.state.id,estado);
    }

    renderList(){
        const {classes} = this.props;
        const colorCelda = {
            colores:[
                {clase: classes.celdaPar},
                {clase: classes.celdaImpar} 
            ]
        }
        if (this.state.registros!==null){
            return(
                <div>
                    {this.state.registros.map((c,index) => 
                
                        <div className={colorCelda.colores[index%2].clase} key={index.toString()}>
                            <CeldaConf 
                                id={c.id}
                                estado={this.state.registros[index]}
                                onSubmit = {this.onSubmitConf}
                                onDelete = {this.onSubmitDelete}
                            />
                        </div>
                    )}
                </div>
            );
        }
    }
    renderButtonAdd(){
        const {classes} = this.props;
        if (this.state.id!==null){
        return(
            <Fab color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon 
                        onClick ={ this.onAddConf}
                    />
                    </Fab>
            )
        }
    }
    render(){
        const {classes} = this.props;
        return(
                <div className={classes.main}>
                    {this.renderList()}
                    
                    {this.renderButtonAdd()}
                </div>

                
            
        );
    }
}

export default withStyles(styles)(Conf);