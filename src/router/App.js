import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.less';

export default class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          
      }
  }


  render() {
      return (
          <Router>
              <Route exact path='/' >
                  
              </Route>
          </Router>
      );
  }
}
