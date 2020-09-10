import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Review from './components/Review/Review';
import NoMatch from './components/NoMatch/NoMatch';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Loggin from './components/Loggin/Loggin';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Inventory from './components/Inventory/Inventory';
export const UserContext = createContext();

function App() {
  const [loggingUser, setLoggingUser] = useState({});
  return (
    <UserContext.Provider value={[loggingUser, setLoggingUser]}>
      <h6>Email: {loggingUser.email}</h6>
      <Router>
        <Header></Header>
        <Switch>
            <Route path="/login">
              <Loggin />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment/>
            </PrivateRoute>
            <PrivateRoute path="/inventory">
              <Inventory/>
            </PrivateRoute>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail/>
            </Route>
            <Route path="*">
              <NoMatch></NoMatch>
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
