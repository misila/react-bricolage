import React from 'react';
import Library from './Library'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Question from './Question'
import PropTypes from 'prop-types'
import App from './App';
import { render } from 'react-dom'



let bookList = [
    {"title": "Hunger", "author": "Roxane Gay", "pages": 320},
    {"title": "The Sun also Rises", "author": "Ernest Hemingway", "pages": 260},
    {"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
    {"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304}
]


var style = {
    backgroundColor: 'orange',
    color: 'white', 
    fontFamily: 'Arial'
}


class FavoriteColorForm extends React.Component {
    
    state = { value: ''}
    newColor = e => 
        this.setState({value: e.target.value })

    submit = e => {
        console.log(`New Color: ${this.state.value}`)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <label>Favorite Color : 
                    <input type="color" onChange={this.newColor} />
                </label>
                <button> Submit </button>
            </form>
        )
    }
}

Library.propTypes = {
    books: PropTypes.array
}



render(
    <App />,
    //<FavoriteColorForm />,
    document.getElementById('root')
)
//ReactDOM.render(<App />, document.getElementById('root'));
