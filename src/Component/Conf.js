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
                {id:1},
                {id:2},
                {id:3},
                {id:4},
            ]
        }
        this.onSubmitConf = this.onSubmitConfFunc.bind(this);
        this.onSubmitDelete = this.onSubmitDeleteFunc.bind(this);
        this.onAddConf = this.addConf.bind(this);
    }
    componentDidMount(){
        /* Cargamos tema de bbdd */
    }
    addConf(){
        console.log("Añado un registro nuevo")
        console.log(this.state.registros);
        var auxRg = this.state.registros;
        auxRg.push({id:3});
        this.setState({
            registros: auxRg
        })
    }
    onSubmitDeleteFunc(id){
        console.log("Borramos elemento: " + id.toString());
        var newArray = this.state.registros.filter((value)=>{
            return value.id!==id;
        })
        console.log(newArray);
        this.setState({
            registros: newArray
        })
    }

    onSubmitConfFunc (estado){
        console.log("Actualizamos: Celda!! ");
        console.log(estado);
    }

    renderList(){
        const {classes} = this.props;
        const colorCelda = {
            colores:[
                {clase: classes.celdaPar},
                {clase: classes.celdaImpar} 
            ]
        }
 
        return(
            <div>
                {this.state.registros.map((c,index) => 
            
                    <div className={colorCelda.colores[index%2].clase} key={index.toString()}>
                        <CeldaConf id={c.id}
                            onSubmit = {this.onSubmitConf}
                            onDelete = {this.onSubmitDelete}
                        />
                    </div>
                )}
            </div>
       );
    }
    render(){
        const {classes} = this.props;
        return(
                <div className={classes.main}>
                    {this.renderList()}
                    {/*
                    <div className={classes.fakeDiv}>
                    </div>
                    
                    <div className={classes.fakeDiv2}>
                    </div>
                    */}

                    <Fab color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon 
                        onClick ={ this.onAddConf}
                    />
                    </Fab>
                </div>

                //</div>this.renderList()
            
        );
    }
}

export default withStyles(styles)(Conf);