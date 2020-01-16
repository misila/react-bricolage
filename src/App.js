import React from 'react';
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
//import logo from './logo.svg';



class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: 'Nounours'
    };
  }

  render() {
    return (
      <div>
        <Navigation />
        {this.state.user && <Welcome user={this.state.user} />}
        <Home user={this.state.user} />
      </div>
    );
  }
}

export default App;
