import React , { useState } from 'react';
import {Formik, Form, Field} from 'formik';
import axios from "axios";
import {history} from '../../history'

import styles from './styles.module.css';
import Logo from '../../assets/logo.png';

function Login(){
    
    const [emailStatus,setemailStatus] = useState(true);
    const [passwStatus,setpasswStatus] = useState(true);
    const [loading,setLoading] = useState(false)

    interface submit {
        
        email:String,
        password:String
    }
    
    function handleSubmit (values:submit) {

        if(values.email == null || values.password == null){
            if(values.email == null){
                alert("Insira um email")
                setemailStatus(false)
                setLoading(false)
            } 
            else {
                alert("Insira uma senha")
                setpasswStatus(false)
                setLoading(false)
            }
        }
        else if(values.email === "" || values.password === ""){
            
            if(values.email === ""){ 
                alert("Insira um email")
                setemailStatus(false)
                setLoading(false)
            }
            alert("Insira uma senha")
            setpasswStatus(false)
            setLoading(false)
            
        }
        else{

            setLoading(true)

            const send = {
                "email": values.email,
                "password": values.password
            }
            
            axios.post('https://mid-mvp.herokuapp.com/auth/authenticate',send)
            .then(resp =>{
                const  { data }  = resp;
                                  
                sessionStorage.setItem('user-token',data.token)
                sessionStorage.setItem('user-name',data.user.name)
                history.push('/painel')               

            }).catch( error =>{
               
                alert(error.response.data.error)

                setLoading(false)
                                
            })
        }
    }
    var form = 
        
            <div className={styles.content} >
                <img src={Logo} alt="Logomarca"/>
                <Formik
                    initialValues ={{
                        email: "",
                        password: ""
                    }}
                    onSubmit={handleSubmit}
                >     
                <Form>
                    <div className={styles.input}>
                        <div className={styles.inputblock}>
                            <Field name="email" type="email" placeholder="Email" id={emailStatus ? "none" : "red"} />
                            <Field name="password" type="password" placeholder="Password" id={passwStatus ? "" : "red"} /> 
                        </div>                     
                            <button  type="submit" >Entrar</button>
                    </div>
                </Form>
                </Formik>
            </div>
        
    var animation = 
        <div className={styles.animation}>
            <div className="animation-content">
                <div className= {styles.loading} ></div>
                <h1>Verificando usuário</h1>  
            </div>       
        </div>
    
    return(
        <main>
            { loading ? animation : form }
        </main>
    );
}

export default Login;