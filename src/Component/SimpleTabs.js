import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
//import * as firebase from 'firebase';
import compose from 'recompose/compose';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

/* Los componentes */
import SigIn from './SigIn'
import Home from './Home'
import Conf from './Conf'
import Registros from './Registros'
import CeldaRegistro from './DiaRegistro'

//var config = require('../config/firebase_conf').firebase

//var cloud = require('../Controladores/cloud');
import Cloud from '../Controladores/cloud';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  panel2:{
    display:'flex',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignContent:'center',
    margin:"0px",
  }
});


class SimpleTabs extends React.Component {
  constructor(props){
    super(props);
    var cloud = new Cloud();
    this.state = {
      value: 0,
      user:null,
      cloud: cloud

    }
    this.onSigIn = this.onSigInFunc.bind(this)
  }
  componentDidMount(){
    this.state.cloud.bbdd.auth().onAuthStateChanged(user =>{
      if (user){
          console.log("Usuario autenticado!!!");
          console.log(user.email);
          this.setState({
              user: user
          })
      }
    });
  }

  onSigInFunc(user,pass){
    /*
    firebase.auth().signInWithEmailAndPassword(user,pass).catch(function(error){
      console("Mando auth y que sale??");
      console.log(error);
      alert(error.code);
  });*/
    console.log("Autenticando:");
    this.state.cloud.autentica(user,pass);
  }

  handleChange = (event, value) => {
    console.log('Cambio a '+ value)
    this.setState({ value });
  };
  renderLogin(){
    return(
      <SigIn onSigIn ={this.onSigIn} />
    )
  }
  renderTabs(){
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Hidden only={['sm','md','lg','xl']}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Estado" />
              <Tab label="Configuración" />
              <Tab label="Registros" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><Home bbdd={this.state.cloud}/></TabContainer>}
          {value === 1 && <TabContainer><Conf bbdd={this.state.cloud}/></TabContainer>}
          {value === 2 && <TabContainer><Registros bbdd={this.state.cloud}/></TabContainer>}
        </Hidden>
        <Hidden only={['xs','lg','xl','md']}>
          <div className={classes.panel2}>
            <Home bbdd={this.state.cloud}/>
            <Conf bbdd={this.state.cloud}/>
          </div>
        </Hidden>
        <Hidden only={['xs','sm']}>
          <div className={classes.panel2}>
            <Home bbdd={this.state.cloud}/>
            <Conf bbdd={this.state.cloud}/>
            <Registros bbdd={this.state.cloud}/>
          </div>
        </Hidden>
      </div>
    );
  }

  render() {
    console.log(this.state.user);
    if (this.state.user){
      return(this.renderTabs());
    }
    else{
      return(this.renderLogin());
    }
  }
}


SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withWidth(),withStyles(styles),)(SimpleTabs);