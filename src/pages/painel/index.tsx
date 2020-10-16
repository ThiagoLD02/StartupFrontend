import React, { useEffect, useState } from 'react';

import style from './styles.module.css';

import Dashboardheader from '../../components/header';
import Sidebar from '../../components/side-bar';
import Axios from 'axios';
import {Bar} from 'react-chartjs-2'
import {Line} from 'react-chartjs-2';

const username = String(sessionStorage.getItem('user-name'))

function Painel(){

    const [devicesdata1, setdevicesdata1] = useState<any>();
    const [devicesdata2, setdevicesdata2] = useState<any>();

    const [measuresdata1, setmeasuresdata1] = useState<any>();
    const [measuresdata2, setmeasuresdata2] = useState<any>();

    const [showdata, setshowdata] = useState(false);
  
        
        useEffect(()=>{ 
        const macparams = {
            headers: {
                'Authorization': `bearer ${sessionStorage.getItem('user-token')}`
            }
        }
        
        Axios.get("https://mid-mvp.herokuapp.com/dashboard",macparams).then(
        resp =>{
            
            
            const thisdevices  = resp.data.devices.currentYear;
            const lastdevices  = resp.data.devices.lastYear;

            const thismeasures  = resp.data.measure.currentMonth;
            const lastmeasures  = resp.data.measure.lastMonth;

            
            setdevicesdata1(thisdevices)
            setdevicesdata2(lastdevices)
            
            setmeasuresdata1(thismeasures)
            setmeasuresdata2(lastmeasures)
            setshowdata(true)

            
        }).catch( error => {
            alert(error.response.data.error)
        });
    },[])

    const bardata = {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL','AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [
        {
            label: 'Este ano',
            backgroundColor: 'rgba(3, 23, 39,1)',
            borderColor: 'rgba(136, 249, 212,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(3, 23, 39,0.6)',
            hoverBorderColor: 'rgba(136, 249, 212,1)',
            data: devicesdata1,
        },
        {
            label: 'Ano passado',
            backgroundColor: 'rgba(24, 194, 156,1)',
            borderColor: 'rgba(3, 23, 39,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(24, 194, 156,0.6)',
            hoverBorderColor: 'rgba(3, 23, 39,1)',
            data: devicesdata2, 
        }
        ]
      };
    const linedata = {
        labels: ['1', '3', '5', '7', '9', '11', '13','15', '17', '19','21','23','25','27','29','30'],
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
            data: measuresdata1
        }, 
        {
            label: 'Mês passado',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(24, 194, 156,1)',
            borderColor: 'rgba(3, 23, 39,1)',
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
            data: measuresdata2
        }  
        ]
    };

    const charts = 
        <div className={style.charts}>
            <div className={style.chart}>
            <Bar
                data={bardata}
                width={700}
                height={500}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: 'Quantidade de dispositivos',
                            
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Meses',
                                
                            }
                            }]
                    }
                }}
            />
            </div>
            <div className={style.chart}>
                <Line 
                    data={linedata} 
                    width={700}
                    height={500}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                display: true,
                                labelString: 'Litros/S',
                                
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
        </div>
    const animation = 
    <div className={style.animation}>
        <div className="animation-content">
            <div className= {style.loading} ></div>
            <h1>Carregando dados</h1>  
        </div>       
    </div>
    return(
        <div className={style.dispositivepage}>
            <Dashboardheader name={username} ></Dashboardheader>
            <div className={style.panelmainbox}>
                <Sidebar item={"first"} ></Sidebar> 
                <div className={style.panelContent}>
                    <h1>Painel inicial</h1>
                    {showdata ? charts : animation}
                </div>       
            </div>
        </div>
    );
};

export default Painel;