import React, { useEffect, useState } from 'react';
import Dashboardheader from '../../components/header';
import { Field, Form, Formik } from 'formik';
import Axios from 'axios';
import Select from 'react-select';

import styles from './styles.module.css'
import Sidebar from '../../components/side-bar';
import Logo from '../../assets/logo.png'

const username = String(sessionStorage.getItem('user-name'))



function Cadastrar(){
    
    
    const [loading,setLoading] = useState(false);
    const [macs,setmacs] = useState<any>([]);
    const [mac,setmac] = useState();


    const macparams = {
        headers: {
          'Authorization': `bearer ${sessionStorage.getItem('user-token')}`
        }
    }
    useEffect(()=>{
    Axios.get('https://mid-mvp.herokuapp.com/device/listMac?user=',macparams).then(
        resp =>{
            const {data} = resp;
            setmacs(data);
        }
    ).catch(err =>{alert(err.response.data.error)})
    },[]) 
    interface submit {
        
        name:String,
        email:String,
        cpf:String,
        birth:String,
        address:String
        
    }

    function handleSubmit (values:submit) {
        setLoading(true)
        const send = {
            
            "name": values.name,
            "email": values.email,
            "cpf": values.cpf,
            "birth": values.birth,
            "address": values.address,
            "device": mac
            
        }
        const headerparms = {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('user-token')}`
            }
        }

        
        Axios.post('https://mid-mvp.herokuapp.com/client',send,headerparms)
        .then(resp =>{
            
            alert("Cliente cadastrado com sucesso!")
            setLoading(false)


        }).catch( error =>{
            
            alert(error.response.data.error)
            setLoading(false)
        })
        
    
    }   
    const animation = 
        <div className={styles.animation}>
            <div className="animation-content">
                <div className= {styles.loading} ></div>
                <h1>Cadastrando usuário</h1>  
            </div>       
        </div>
    function handleReactSelect(value:any){
        setmac(value.value)
    }
    const form =
        
        <div className={styles.inputBlock} >
            <img src={Logo} alt="Logomarca"/>
            <Formik
                initialValues ={{
                    name: "",
                    email: "",
                    cpf: "",
                    birth: "",
                    address: "",
                    mac: ""
                    
                }}
                onSubmit={handleSubmit}
            >     
            <Form>
            <div className={styles.input}>
                <div className={styles.inputblock}>
                    <Field name="name" type="text" placeholder="Nome"/>
                    <Field name="email" type="email" placeholder="Email"/>
                    <Field name="cpf" type="text" placeholder="CPF"/>
                    <Field name="birth" type="text" placeholder="Data de nascimento"/>
                    <Field name="address" type="text" placeholder="Endereço"/>
                    <div className={styles.inputblockSelect}>
                        <Select
                            options={macs}
                            onChange={handleReactSelect}
                            placeholder="Selecione um dispositivo"
                        ></Select>
                    </div>
                </div>                     
                    <button  type="submit" >Cadastrar</button>
            </div>
            </Form>
            </Formik>
        </div>
            

    return(
        <div className={styles.mainBox}>
            <Dashboardheader name={username} ></Dashboardheader>
            <div className={styles.content}>
                <Sidebar item={"last"} ></Sidebar>
                <div className={styles.panelContent}>
                    { loading ? animation : form }

                </div> 
            </div>
            
        </div>
    );
};

export default Cadastrar;