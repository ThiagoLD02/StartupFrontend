import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import styles from './styles.module.css';

import antena from '../../assets/antena.png'

import Axios from 'axios';
import Dashboardheader from '../../components/header';
import Sidebar from '../../components/side-bar';





function Users(props:any){
    
    
    const [showboxes,setshowboxes] = useState(false);
    const [mac,setmac] = useState([""]);
    const [status,setstatus] = useState([true]);
    const [boxes,setboxes] = useState(Number);
    const [battery,setbattery] = useState([""]);
    const [options,setOptions] = useState<any>([]);


    function getBoxes(){ 

            var boxcontent= []

            for(var i = 0;i<boxes;i++){
                
                let style = {
                    height: battery[i]
                }
                boxcontent.push(
                    
                    
                    <div className={styles.dispositivesBox} key={i}>
                        <div className={styles.dispositivesBoxHeader}>
                            <h1>{mac[i]}</h1> 
                            <div className={styles.batteryBox}>
                                {battery[i]}
                                <div className={styles.battery}>
                                    <div className={styles.batteryLevel} style={style}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dispositivesBoxContent}>
                            <img src={antena} alt="antena"/>
                            
                            <div 
                                className={styles.dispositivesBoxContentStatus}
                                id={status[i] ? "blue"  :"red"}
                            >
                            { status[i] ? "Ativo" : "Inativo"}
                            </div>
                        </div>
                    </div>
                    
    
                    , 
                )
            }
            
            if(boxcontent)
                return boxcontent;   
                 
    }

    function handleSelect(selected:any){
        Axios.get(
            'https://mid-mvp.herokuapp.com/device?user=' 
            + selected.value
        )
        .then(resp =>{
            const { data } = resp
            
            const size = data.length
            
            setboxes(size)
            
            

            let aux = []
            for(let i = 0; i<size;i++){
                aux.push(String(data[i].mac))  
            }
            setmac(aux)
            
            aux = []
            for(let i = 0; i<size;i++){
                aux.push(data[i].status)
            }
            setstatus(aux)      
            
            aux = []
            for(let i = 0; i<size;i++){
                aux.push(String(data[i].battery)+"%")
            }
            setbattery(aux) 
    
        }).catch( error =>{
            
            const delayInMilliseconds = 2000; 
                   
            alert(error.response.data.error)
            
            setTimeout(function() {
                document.location.reload()
            }, delayInMilliseconds)
        })

        setshowboxes(true)
    }

    

    
    const message = ""
    
    

    useEffect(()=>{
        
        const macparams = {
            headers: {
              'Authorization': `bearer ${sessionStorage.getItem('user-token')}`
            }
        }
        Axios.get("https://mid-mvp.herokuapp.com/client",macparams).then(
        resp =>{
            
            const { data } = resp;
            
            setOptions(data)
            


            
        }).catch( error => {
            alert(error.response.data.error)
        });
        
    },[])
    const username = String(sessionStorage.getItem('user-name'))


    return (
       <div id="dispositive-page">
           <Dashboardheader name={username} ></Dashboardheader>
            <div id="main-box">
           <Sidebar item={"third"} ></Sidebar>

                <div className={styles.dispositives}>
                    <div className={styles.dispositivesList}>
                        <Select
                            options={options}
                            onChange={handleSelect}
                        ></Select>
                    </div>
                    <h2>{
                        showboxes ?  message :"Selecione um usuário"
                    }
                    </h2>
                    
                    <div className={styles.dispositivesContent}>

                        { showboxes ?  getBoxes(): message }
                        
                    </div>
                </div>
            </div>
        </div>
       
           
           
    );
}

export default Users;