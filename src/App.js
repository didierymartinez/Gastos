//https://neumorphism.io/#545454
import "./styles.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Detalle from "./components/cuentas/Detalle";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import Button from "react-bootstrap/Button";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Button variant="primary">Launch demo modal</Button>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route path="/cuentas/:id" children={<Detalle />} />
          {/* <Route path="/img/:id" children={<ImageView />} /> */}
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}
