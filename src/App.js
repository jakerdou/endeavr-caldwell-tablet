import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import axios from "axios"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './components/Home';

import './App.css';

const config = require('./frontend-config.json');

function App() {

  const testAPI = () => {
    axios.get("/caldwelldata/test").then(response => {
      
      console.log(response);
    })
  
    
  }
/*
   //root page route;
  <Route path="/">
    <Button onClick={testAPI}>Hit Backend</Button>
    <Link to='/home'><Button>Go to Home Page</Button></Link>
  </Route>
 */ 

  return (
    <Router>
      <div className='app h-100'>
        <div className="mt-4">
          <Switch>
            <Route path="/home">
              <Button onClick={testAPI}>Hit Backend</Button>
              <Home />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
