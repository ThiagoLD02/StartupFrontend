import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

import Modal from '@material-ui/core/Modal';
import Select from 'react-select';

import styles from './styles.module.css';
import Dashboardheader from '../../components/header';
import Axios from 'axios';
import Sidebar from '../../components/side-bar';
import { Field, Form, Formik } from 'formik';



const macparams = {
    headers: {
      'Authorization': `bearer ${sessionStorage.getItem('user-token')}`
    }
}


function Instalacoes(props:any){
    
    const [users, setUsers] = useState([]);
    const [client, setClient] = useState<any>([]);
    const [measuresdata,setMeasuresdata] = useState<any>([]);
    const [showData, setshowData] = useState(false);
    const [dispStatus, setDispStatus] = useState(false);
    const [mac, setmac] = useState();
    const [sleep,setSleep] = useState([]);
    const [read,setRead] = useState([]);
    const [selected,setselected] = useState("Motivo");



    useEffect(()=>{
        
        
        Axios.get("https://mid-mvp.herokuapp.com/device/listMac",macparams).then(
        resp =>{
            
            
            const { data } = resp;
            
            setUsers(data);

            
        }).catch( error => {
            alert(error.response.data.error)
        });
        
    },[])    

    const [open, setOpen] = React.useState(false);
    const [timeopen, setTimeOpen] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };  
    const handleClose = () => {
        setOpen(false);
    };
    const handleTimeOpen = () => {
        setTimeOpen(true);
    };  
    const handleTimeClose = () => {
        setTimeOpen(false);
    };
    const handleSelect = (e:any) => {
         
        const {value} = e.target;
        setselected(value);

    };
    const handleTimeSelect = (e:any) => {
         
        const {value} = e.target;
        // setselected(value);
        console.log(value,"value")

    };
    const handleSave = () => {
        
        if(dispStatus){ 
            if(selected === "Motivo"){
                alert("Por favor, selecione um motivo");
            }
            else{
                      
                
                const headerparms = {
                    headers: {
                      'Authorization': `Bearer ${sessionStorage.getItem('user-token')}`
                    }
                }
                const bodyparms = {
                    
                    "description": selected
                    
                }
                
                Axios.post("https://mid-mvp.herokuapp.com/device/turnOff/" + mac ,bodyparms,headerparms)
                .then(resp =>{ alert("Dispositivo desligado com sucesso!")})
                .catch(error =>{alert(error.response.data.error)})
                setOpen(false);
            }
        }
        else{ 
            Axios.get
            ("https://mid-mvp.herokuapp.com/device/turnOn/"
            + mac
            );
            setOpen(false);
            setDispStatus(true)
        }
    };
    const handleTimeSave = (values:any) =>{
        const params = {
            "sleepDuration": values.sleep,
	        "readDuration": values.read
        }
        Axios.put("https://mid-mvp.herokuapp.com/device/"+mac,params).then(
            resp =>{
                alert("Valores atualizados!")
                setTimeOpen(false)
            }
        ).catch(
            error =>{
                alert(error.response.data.error)
                setTimeOpen(false)
            }
        )
        
    };
    
    const turnOff = (
        <select defaultValue={selected} onChange = {handleSelect} id="modal-select"> 
            <option >Motivo</option>
            <option value="Pagamento nao efetuado">Pagamento não efetuado</option>
            <option value="Encerramento do contrato">Encerramento do contrato</option>
        </select>
    )
    const turnOn = (
        <h2>Tem certeza?</h2>
    )

    const statusbody = (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.select}>
                    {dispStatus ? turnOff : turnOn}
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleClose}>Cancelar</button>
                    <button onClick={handleSave} > Salvar</button>
                </div>
            </div>
        </div>
    )

    const timesbody = (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.select}>
                    <h2>Selecione os novos valores</h2>
                    <Formik
                    initialValues ={{
                        sleep: "",
                        read: ""
                    }}
                    onSubmit={handleTimeSave}
                    >     
                        <Form>
                            <div className={styles.timeModal}>
                                <div className={styles.inputblock}>
                                    <Field name="sleep" type="number" placeholder="Descanso"  />
                                    <Field name="read" type="number" placeholder="Leitura" /> 
                                </div>
                                <div className={styles.buttons}>  
                                    <button onClick={handleTimeClose}>Cancelar</button>                   
                                    <button  type="submit" >Entrar</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                    
                </div>
            </div>
        </div>
    )

    async function handleReactSelect (value:any){
        const dispData:any = await Axios.get(
            'https://mid-mvp.herokuapp.com/device/detail/' + value.value,macparams

        ).then()
        .catch(error=>{alert(error.response.data.error)})
        
        const {data} = dispData;
        setClient(data.client)
        setDispStatus(data.device.status)
        setMeasuresdata(data.measurements)
        setmac(data.client.device)
        setSleep(data.device.sleepDuration)
        setRead(data.device.readDuration)
        setshowData(true)

    }
    const linedata = {
        labels: ['1', '5', '10', '15','20','25','30'],
        datasets: [
        {
            label: 'Este mês',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(3, 23, 39,1)',
            borderColor: 'rgba(136, 249, 212,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: measuresdata
        }
    ]
    }; 
    const bardata = {
        labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
        datasets:[ 
        {
            label: 'Medida',
            backgroundColor: 'rgba(3, 23, 39,1)',
            borderColor: 'rgba(136, 249, 212,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(3, 23, 39,0.6)',
            hoverBorderColor: 'rgba(136, 249, 212,1)',
            data: measuresdata,
        }]
      };
    
    
    const username = String(sessionStorage.getItem('user-name'))
    var content = 
    <>  
        <p>
            <h2>Nome do cliente: <h4> {client.name}</h4> </h2>
            <h2>CPF do cliente: <h4> {client.cpf}</h4></h2>
            <h2>Email do cliente: <h4> {client.email}</h4></h2>
            <h2>Endereço: <h4> {client.address}</h4></h2>
            <h2>Tempo de descanso: <h4> {sleep}</h4> </h2>
            
        
            <div className={styles.dispStatus}>
                <h2>Tempo de leitura: </h2>
                <h4> {read}</h4> 
                <button onClick={handleTimeOpen}>
                    Alterar tempos  
                </button>
            </div>
            <div className={styles.dispStatus}>
                <h2>Status: </h2>
                <h4> {dispStatus ? "Ativado" : "Desativado"}</h4>
                <button onClick={handleOpen}>
                    {dispStatus ? "Desativar" : "Ativar"}    
                </button>
            </div>
  
        </p>
        <div id="chart">
            <Bar
                data={bardata}
                width={700}
                height={350}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: 'Litros/min',
                            
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Dias do mês',
                                
                            }
                            }]
                    }
                }}    
            />
        </div>
    </>
    
    return (
        <div id="instalacoes">
            <Dashboardheader name={username} ></Dashboardheader>
            <div className={styles.instContent}>
                <Sidebar item={"second"}></Sidebar>
                <div className={styles.mainContent}>
                    <div className={styles.content}>
                        <div className={styles.contentSelect}>
                            <Select
                                options={users}
                                onChange={handleReactSelect}
                                placeholder="Selecione um dispositivo"
                            ></Select>
                        </div>
                        { showData ? content : ""}
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            {statusbody}
            </Modal>
            <Modal
                open={timeopen}
                onClose={handleTimeClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            {timesbody}
            </Modal>
        </div>
    );
};

export default Instalacoes;