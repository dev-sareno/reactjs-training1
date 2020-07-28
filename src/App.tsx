import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Login } from "./Login";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/shoes">
            <h1>Shoes!</h1>
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
