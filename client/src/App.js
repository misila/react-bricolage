import React from 'react';
import Connect from './Connect';
import Navigation from './Navigation';
import { createBrowserHistory } from "history";
import { useHistory } from 'react-router-dom';

import { BrowserRouter as Router,
         Switch,
         Route
 } from 'react-router-dom';


const history = createBrowserHistory();

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    Auth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb) {
    Auth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};




class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null,
      matricule: null,
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin (data, history) {
    console.log(' App.js, handleLogin (data = ', data, ') ');
    history.push('/home');

    this.setState({
      loggedInStatus: "LOGGED_IN",
      matricule: data.matricule,
      user: data.prenom.charAt(0) + data.prenom.slice(1).toLowerCase() + " " + data.nom.toUpperCase()
    });
  }

  handleLogout () {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      matricule: {}
    });
  }

  render() {

    console.log('this.state.matricule = ', this.state.matricule);
 
    return (
      <Router>
        <div>
        <br />
        <Switch>
            <Route exact path="/" children={({history}) => 
            ( <Connect 
              handleSuccessfulAuth={this.state.loggedInStatus} 
              handleLogin={(data) => this.handleLogin(data,history) } />)} > 
              
            </Route>
            <Route
             path="/home"> 
              <Navigation matricule={this.state.matricule} user={this.state.user}  handleLogout={this.handleLogout} />
            </Route>
        </Switch>
        </div>

      </Router>);

  }
}

export default App;
