import React from 'react';

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
class CeldaConf extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //temperatura: Object.values(props.control.automatico)[0]
            id: this.props.id,
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
        
    }
    handleDelete= () =>{
        if (this.props.onDelete){
            this.props.onDelete(this.state.id);
        }
    }
    handleEnable = event =>{
        
        this.setState({
            enabled:event.target.checked,
            pintaAceptar:true
        })
    }
    handleTime = name => event =>{
        
        this.setState({
            [name]: event.target.value,
            pintaAceptar:true
            }
        )
    }

    handleCheck = name => event =>{
        this.pintaAceptar=true;
        this.setState({
            [name]: event.target.checked,
            pintaAceptar:true
            }
        )
    }

    handleEvent  = (event) =>{
        this.setState(
            {pintaAceptar:false}
        )
        event.preventDefault();
        if (this.props.onSubmit){
            this.props.onSubmit(this.state);
        }
    }
    handleSelect = (event) => {
        this.pintaAceptar=true;
        this.setState({
            estadoForm: event.target.value
        })
        
    }
    renderButton(){
        if (this.state.pintaAceptar===true){
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
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.main}>
                <form onSubmit={this.handleEvent}>
                    <div className={classes.lista}>
                    <div className={classes.dia}>
                        <Typography>L</Typography>
                        <Checkbox
                        checked={this.state.L}
                        onChange={this.handleCheck('L')}
                        name="L"
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>M</Typography>
                        <Checkbox
                        checked={this.state.M}
                        onChange={this.handleCheck('M')}
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>X</Typography>
                        <Checkbox
                        checked={this.state.X}
                        onChange={this.handleCheck('X')}
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>J</Typography>
                        <Checkbox
                        checked={this.state.J}
                        onChange={this.handleCheck('J')}
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>V</Typography>
                        <Checkbox
                        checked={this.state.V}
                        onChange={this.handleCheck('V')}
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>S</Typography>
                        <Checkbox
                        checked={this.state.S}
                        onChange={this.handleCheck('S')}
                        />
                    </div>
                    <div className={classes.dia}>
                        <Typography>D</Typography>
                        <Checkbox
                        checked={this.state.D}
                        onChange={this.handleCheck('D')}
                        />
                    </div>
                </div>                 
                    <div className={classes.lista}>
                    
                    <TextField
                        id="time"
                        label="Inicio"
                        type="time"
                        name="hh_ii"
                        onClick={this.handleTime('hh_ii')}
                        defaultValue={this.state.hh_ii}
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
                        label="Inicio"
                        type="time"
                        name="hh_ff"
                        onClick={this.handleTime('hh_ff')}
                        defaultValue={this.state.hh_ff}
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
                    <Select native value={this.state.estadoForm} name="estado"
                        onChange={this.handleSelect}
                    >
                        <option value="on">On</option>
                        <option value="off">Off</option>
                        <option value="auto">Auto</option>
                    </Select>
                    </FormControl>
                    
                    <TextField
                        id="time"
                        label="Temp"
                        maxlenght="2"
                        type="number"
                        name="temperatura"
                        defaultValue={this.state.temperatura}
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
                    {/*           
                        <Button
                            type="submit" 
                            variant="contained"
                            color="primary"
                            visibility="hidden"
                        >Aceptar</Button>
                        */}
                        {this.renderButton()}
                        <Switch
                            checked={this.state.enabled}
                            onChange={this.handleEnable}
                            name="enable"
                            color="primary"
                        />
                        <IconButton variant="contained" onClick={this.handleDelete}> 
                            <Delete/>
                        </IconButton>
                        
                    </div>
                    </form>
                          
            </div>
        );
    }
}




    
CeldaConf.propTypes = {
    id: PropTypes.number.isRequired
};

export default withStyles(styles)(CeldaConf);