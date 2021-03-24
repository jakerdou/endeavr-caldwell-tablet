import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home';

import './App.css';

const config = require('./frontend-config.json');

function App() {

  const testAPI = () => {
        fetch(`${config.backend_url}/test-api`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(res => console.log(JSON.parse(res)))
        .catch(err => err);
    }

  return (
    <Router>
      ENDEAVR TABLET
      <Button onClick={testAPI}>Hit Backend</Button>
      <Link to='/home'><Button>Go to Home Page</Button></Link>
      <div className='app h-100'>
        <div className="mt-4">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
