import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'
import gadgets from '../../assets/gadgets.svg'
import medidas from '../../assets/medidas.svg'
import users from '../../assets/user.svg'
import Adduser from '../../assets/add-user.svg'



function Sidebar(props:any){
    
    return(
        <div className="sideBar" id={props.item}>
            <Link to="/painel">
                <img src={medidas} alt="Figura"/>
                Painel
            </Link>
            <Link to="/instalacoes">
                <img src={gadgets} alt="Figura" />       
                Instalações      
            </Link>
            <Link to="/usuarios">
                <img src={users} alt="Figura" /> 
                Usuários
            </Link>
            <Link to="/cadastrar">
                <img src={Adduser} alt="Figura" /> 
                Cadastrar
            </Link>
        </div>
    );
};

export default Sidebar;