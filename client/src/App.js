import React from 'react';
import Connect from './Connect';
import Navigation from './Navigation';
import { BrowserRouter as Router,
         Switch,
         Route,
         Link,
         useHistory
 } from 'react-router-dom';


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

  handleLogin (data) {
    console.log(' App.js , handleLogin (matricule=', data.matricule+') ');
    this.setState({
      loggedInStatus: "LOGGED_IN",
      matricule: data.matricule
    });
  }

  handleLogout () {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      matricule: {}
    });
  }

  render() {

      console.log('this.state.user = ', this.state.user);
    /*
    return (
      <div>

        <Home user={this.state.user} />
      </div>
    );*/
    return (
      <Router>
        <div>
        <br />
        <Switch>
            <Route exact path="/"> 
              <Connect 
                handleSuccessfulAuth={this.state.loggedInStatus} 
                handleLogin={this.handleLogin} />
            </Route>
            <Route exact path="/home"> 
              <Navigation 
                {...this.props}
                matricule={this.state.matricule} 
                handleLogout={this.handleLogout} />
            </Route>
        </Switch>
        </div>

      </Router>);

  }
}

export default App;
