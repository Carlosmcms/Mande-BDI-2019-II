// Librerias 
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

// Componentes
import Mapa from './shared/components/Mapa/Mapa';
import Fulldiv from './shared/components/Fulldiv/Fulldiv';
import Login from './shared/pages/Login';
import Clientes from './cliente/pages/Clientes';
import Trabajadores from './trabajador/pages/Trabajadores';

import logo from './logo.svg';

import './App.css';
import './util.css';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/Cliente" exact>
          <Clientes />
        </Route>
        <Route path="/Trabajador" exact>
          <Trabajadores />
        </Route>
        <Route path="/Mapa" exact>
          <Mapa />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

