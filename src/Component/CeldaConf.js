import React, { useState,useContext } from 'react';

import { Checkbox,Typography,TextField, Button, InputLabel, Select, IconButton, FormControl, Switch} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types';

const styles = theme => ({
    main:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        margin:"0px",
        //boxShadow:"0 0 10px 0px ",
        
    },
    lista:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'bottom',
        justifyContent:'space-around',
        margin: theme.spacing.unit *1 ,
        padding: 0
    },
    dia:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        margin:0,
        padding:0
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
    },
    textoTemp:{
        width:"30px"
    },
    
})
function CeldaConf (props) {
    
    const [state,setState] = useState(props.estado);
    
    
    const {classes,onDelete,onSubmit} = props;
    
    
    

    /* Handlers */
    const handleTemperatura = event =>{
        
        setState( (prevState) =>(
            {
                ...prevState,
                [event.target.name]: event.target.checked,
                pintaAceptar:true,
            }
        ))  


        setState((prevState)=>(
            {
                ...prevState,
                temperatura:event.target.value,
                pintaAceptar:true
            }
        ))
        
    }
    
    const handleDelete= () =>{
        
        if (onDelete){
            onDelete(state.id);
        }
        
    }
    const handleEnable = event =>{
        
        setState((prevState)=>(
            {
                ...prevState,
                enabled:event.target.checked,
                pintaAceptar:true
            }
        ));
        
    }
    const handleTime = name => event =>{
        
        setState((prevState)=>(
            {
                ...prevState, 
                pintaAceptar:true,
                [name]: event.target.value,
            }
        ));
        
    }

    function handleCheck (event){
        setState( (prevState) =>(
            {
                ...prevState,
                [event.target.name]: event.target.checked,
                pintaAceptar:true,
            }
        ))  
    }

    const handleEvent  = (event) =>{
        
        event.preventDefault();
        setState((prevState)=>({
            ...prevState,
            pintaAceptar: false
        }));
        if (onSubmit){
            var enviarEstado = state;
            delete enviarEstado.pintaAceptar;
            onSubmit(enviarEstado);
        }
    }
    const handleSelect = (event) => {  
        
        setState((prevState)=>({
            ...prevState,
            estadoForm: event.target.value,
            pintaAceptar: true
        }));  
        
    }

    const renderButton=()=>{ 
        
        if (state.pintaAceptar===true){
            return(
                <Button
                    type="submit" 
                    variant="contained"
                    color="primary"
                    visibility="hidden"
                >Aceptar</Button>
            );
        }
        
    }
    
    if (!true){
        return(<></>)
    }
    else {
        console.log("CELDA_CONF: Repinto la puta celda")
        return( 
            <div className={classes.main}>
                <form onSubmit={handleEvent}>
                    <div className={classes.lista}>
                    <div className={classes.dia}>
                        <Typography>L</Typography>
                        <Checkbox
                        checked={state.L}
                        value={state.L}
                        onChange={handleCheck}
                        name="L"
                        />
                    </div>
           
        
            
                    <div className={classes.dia}>
                        <Typography>M</Typography>
                        <Checkbox
                        checked={state.M}
                        value={state.M}
                        onChange={handleCheck}
                        name="M"
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>X</Typography>
                        <Checkbox
                        checked={state.X}
                        onChange={handleCheck}
                        name="X"
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>J</Typography>
                        <Checkbox
                        checked={state.J}
                        onChange={handleCheck}
                        name="J"
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>V</Typography>
                        <Checkbox
                        checked={state.V}
                        onChange={handleCheck}
                        name="V"
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>S</Typography>
                        <Checkbox
                        checked={state.S}
                        onChange={handleCheck}
                        name="S"
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>D</Typography>
                        <Checkbox
                        checked={state.D}
                        onChange={handleCheck}
                        name="D"
                        />
                    </div>
                </div>                 
                    <div className={classes.lista}>
                    <TextField
                        id="time"
                        label="Inicio"
                        type="time"
                        name="hh_ii"
                        onClick={handleTime('hh_ii')}
                        defaultValue={state.hh_ii}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 60, // 5 min
                        }}
                    />
                    <TextField
                        id="time"
                        label="Fin"
                        type="time"
                        name="hh_ff"
                        onClick={handleTime('hh_ff')}
                        defaultValue={state.hh_ff}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 60, // 5 min
                        }}
                    />
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name-native-disabled">Modo</InputLabel>
                    <Select native value={state.estadoForm} name="estado"
                        onChange={handleSelect}
                    >
                        <option value="on">On</option>
                        <option value="off">Off</option>
                        <option value="automatico">Auto</option>
                    </Select>
                    </FormControl>
                    
                    <TextField
                        id="time"
                        label="Temp"
                        maxlenght="3"
                        type="number"
                        name="temperatura"
                        onChange={handleTemperatura}
                        defaultValue={state.temperatura}
                        className={classes.textoTemp}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 1, // 5 min
                        }}
                    />
                    
                    </div>
                    <div className={classes.lista}>
                    
                        {renderButton()}
                        
                        <Switch
                            checked={state.enabled}
                            onChange={handleEnable}
                            name="enable"
                            color="primary"
                        />
                        
                        <IconButton variant="contained" onClick={handleDelete}> 
                            <Delete/>
                        </IconButton>
                        
                    </div>
                    </form>
                            
            </div>
        )
        
    }
}    

export default withStyles(styles)(CeldaConf);