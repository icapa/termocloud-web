import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
//import * as firebase from 'firebase';


/* Los componentes */
import SigIn from './SigIn'
import Home from './Home'
import Conf from './Conf'

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
});


class SimpleTabs extends React.Component {
  constructor(props){
    super(props);
    var cloud = new Cloud();
    this.state = {
      value: 0,
      user:-1,
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
    this.cloud.autentica(user,pass);
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
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Estado" />
            <Tab label="Configuración" />
            <Tab label="Registros" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Home bbdd={this.state.cloud}/></TabContainer>}
        {value === 1 && <TabContainer><Conf bbdd={this.state.cloud}/></TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
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

export default withStyles(styles)(SimpleTabs);