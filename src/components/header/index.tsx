import React from 'react';

import styles from './styles.module.css'

import username from '../../assets/Username.svg';
import Logo from '../../assets/logoimg.png';


interface PageHeaderProps {
    name: string;
}

function Dashboardheader(props:PageHeaderProps){
    return(
        
        <header className={styles.topo}>
            <img src={Logo} alt="Menu"/>
            <div className={styles.rightSide}>
                <img src={username} alt=""/>
                <h1>{props.name}</h1>
            </div>
        </header>
    );
};

export default Dashboardheader;