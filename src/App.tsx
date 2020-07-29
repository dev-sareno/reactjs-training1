import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Login } from "./Login";
import { Shoes } from './shoes/Shoes';

function App() {
  return (
    <div className={'page-container'}>
      <BrowserRouter>
        <div>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/shoes">
              <Shoes/>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
