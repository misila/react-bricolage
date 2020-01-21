import React from 'react';
import Home from './Home';
//import logo from './logo.svg';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div>
        
        <Home user={this.state.user} />
      </div>
    );
  }
}

export default App;
