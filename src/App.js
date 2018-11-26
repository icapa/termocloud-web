import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import Home from './Component/Home';
import About from './Component/About';
import Navigation from './Component/Navigation'

import { withStyles } from '@material-ui/core/styles'

const styles={
  root: {
    margin: 20,
    padding: 20,
    maxWidth:200
  }
}

export default withStyles(styles)(
class App extends Component {
  render() {
    return (
      <div>
          {/*
          <Navigation/>
          */}
           {/**
                 *  route to diffrent component
                 */}
         <Route exact={true} path={'/'} component={Home} />
         <Route exact={true} path={'/about'} component={About}/>
      </div>
    );
  }
}
)

