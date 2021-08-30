import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NodeList from './NodeList';
import NodeEdit from "./NodeEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/nodes' exact={true} component={NodeList}/>
            <Route path='/nodes/:id' component={NodeEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;