import React from 'react';

import { Checkbox,Typography,TextField, Button, Input} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    main:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',

    },
    lista:{
        display:'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        margin: theme.spacing.unit *0.5 ,
        padding: theme.spacing.unit *0.5
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
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
});

const handleEvent  = (event) =>{
    event.preventDefault();
    console.log("LLego al puto click");
    console.log(event.target);
    const data = new FormData(event.target);
    console.log("Y el data que");
    console.log(data.entries());
    for (var [key,value] of data.entries()){
        console.log("TEngi datos...");
        console.log(key,value);
    }
}

const CeldaConf = (props)=>{
    const {classes} = props;
    

    return(
        <div className={classes.main}>
            
            <div className={classes.lista}>
                <div className={classes.dia}>
                    <Typography>L</Typography>
                    <Checkbox
                    value="L"
                    />
                </div>
                <div className={classes.dia}>
                    <Typography>M</Typography>
                    <Checkbox
                    value="M"
                    />
                </div>
                <div className={classes.dia}>
                    <Typography>X</Typography>
                    <Checkbox
                    value="X"
                    />
                </div>
                <div className={classes.dia}>
                    <Typography>J</Typography>
                    <Checkbox
                    value="J"
                    />
                </div>
                <div className={classes.dia}>
                    <Typography>V</Typography>
                    <Checkbox
                    value="V"
                    />
                </div>
                <div className={classes.dia}>
                    <Typography>S</Typography>
                    <Checkbox
                    value="S"
                    />
                </div>
                <div className={classes.dia}>
                    <Typography>D</Typography>
                    <Checkbox
                    value="D"
                    />
                </div>
            </div>
            
                <form onSubmit={handleEvent}>
                <div className={classes.lista}>
                
                <Input id="email" name="email" autoComplete="email" autoFocus />
                
                
                
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Aceptar</Button>
                </form>
                
                
            
        </div>
    );
}
export default withStyles(styles)(CeldaConf);