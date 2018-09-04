import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import MovieList from './MovieList';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div style={{ position: 'relative' }} className="App-header">
            <h1 className="App-title">
              <Link to="/">
                <img src={logo} alt=" logo" />
              </Link>
            </h1>
          </div>
          <br />
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route exact path="/details/:id" component={DetailsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
