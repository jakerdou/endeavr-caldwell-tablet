import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home';

import './App.css';

function App() {
  return (
    <Router>
      ENDEAVR TABLET
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
