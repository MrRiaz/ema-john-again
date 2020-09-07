import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Home from './components/Home/Home';
import Review from './components/Review/Review';
import NoMatch from './components/NoMatch/NoMatch';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="*">
              <NoMatch></NoMatch>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
