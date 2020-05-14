import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Main from './components/Landing/Main'
import TODOMain from './components/Dashboard/TODOMain'


function App(props) {
useEffect(()=>{
  props.fetchUser();
},[])
  return (
    <Router>
    <Switch>
     
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/dashboard">
        <TODOMain />
      </Route>
    </Switch>

</Router>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
};

export default connect(mapStateToProps, actions)(App);