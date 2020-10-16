import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';


import Login from './pages/login';

import Users from './pages/users';
import Painel from './pages/painel';
import Instalacoes from './pages/instalacoes';
import Cadastrar from './pages/cadastrar';
import PrivateRoute from './services/privateRoute';
import { history } from './history';


function Routes(){
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component = {Login} />
                <PrivateRoute path="/painel" component = {Painel} />
                <PrivateRoute path="/instalacoes" component = {Instalacoes} />
                <PrivateRoute path="/usuarios" component = {Users} />
                <PrivateRoute path="/cadastrar" component = {Cadastrar} />

            </Switch>
        </Router>
    );
}

export default Routes;