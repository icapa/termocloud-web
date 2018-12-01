import React, { Component } from 'react';

import SimpleTabs from './Component/SimpleTabs'



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
      <SimpleTabs />
    );
  }
}
)

