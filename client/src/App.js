import React, { useState } from 'react';
import Connect from './Connect';
import Navigation from './Navigation';
import { createBrowserHistory } from "history";
import { useHistory } from 'react-router-dom';


import { BrowserRouter as Router,
         Switch,
         Route,
         Redirect
 } from 'react-router-dom';


const history = createBrowserHistory();

const bricoAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    bricoAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb) {
    bricoAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      bricoAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)


function App(){

  const [user, setUser] = useState(null);
  const [matricule, setMatricule] = useState(null);
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  

  return (
    <Router>
      <div>
      <br />
      <Switch>
        <Route exact path="/" children={({history}) => 
         ( <Connect 
            handleSuccessfulAuth={loggedInStatus} 
            handleLogin={ (data) => {
              
              setMatricule(data.matricule);
              setUser(data.prenom.charAt(0) + data.prenom.slice(1).toLowerCase() + " " + data.nom.toUpperCase());
              setLoggedInStatus("LOGGED_IN");
              history.push('/home');
            }} 
           />)} /> 
          <Route path="/home">
            <Navigation matricule={matricule} user={user} handleLogout={ () => {
              setUser(null);
              setLoggedInStatus("NOT_LOGGED_IN");
              setMatricule(null);
            }} />
          </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
