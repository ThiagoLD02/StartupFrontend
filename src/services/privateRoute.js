import React from 'react'

import { Route, Redirect } from 'react-router'

const PrivateRoute = props => {
    const isLogged = !!sessionStorage.getItem('user-token')
    if( isLogged ) { 
        return <Route {...props}/> 
    } 
    alert("Erro no login, por favor tente novamente")
    return <Redirect to="/"/>
}

export default PrivateRoute