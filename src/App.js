import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AddExpense from './components/AddExpense';
import Categories from './components/Categories';
import Expenses from './components/Expenses';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userID, setUserID] = useState();
  const [name, setName] = useState();

  const onSignIn = googleUser => {
    console.log('in function');
    console.log('user', googleUser);
    var profile = googleUser.getBasicProfile();
    console.log('res ', googleUser.getAuthResponse());
    console.log('token', googleUser.getAuthResponse().id_token);

    setIsLoggedIn(true)
    setUserID(profile.getId());
    setName(profile.getName());
  }

  const onLogout = googleUser => {
    setIsLoggedIn(false)
  }


  return (
    <Router>
      <div className='app h-100'>
        <Navbar className="bg-purp">
          <Navbar.Brand>Quick Dollas</Navbar.Brand>
          <Navbar.Text className="ml-2"><Link to="/">Add Transaction</Link></Navbar.Text>
          <Navbar.Text className="ml-2"><Link to="/categories">Categories</Link></Navbar.Text>
          <Navbar.Text className="ml-2"><Link to='/expenses'>Transactions</Link></Navbar.Text>
          <div className="google-stuff">
          {
            isLoggedIn
            ?
            <GoogleLogout
              clientId="180544136485-bildtjala9v81f48f6uq90epp6l7dhnt.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={onLogout}
            >
            </GoogleLogout>
            :
            <GoogleLogin
              className="mr-2"
              clientId="180544136485-bildtjala9v81f48f6uq90epp6l7dhnt.apps.googleusercontent.com"
              buttonText={"Login with Google"}
              onSuccess={onSignIn}
              onFailure={error => console.log('error with google stuff', error)}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            >
            </GoogleLogin>
          }
          </div>
        </Navbar>
        <div>{name ? null : 'Please sign in to use the app'}</div>
        {
          isLoggedIn
          ? (
            <div className="mt-4">
              <Switch>
                <Route path="/categories">
                  <div>
                    <Categories userID={userID}/>
                  </div>
                </Route>
                <Route path="/expenses">
                  <div>
                    <Expenses userID={userID}/>
                  </div>
                </Route>
                <Route path="/">
                    <AddExpense userID={userID}/>
                </Route>
              </Switch>
            </div>
          )
          : null
        }

      </div>
    </Router>

  );
}

export default App;
