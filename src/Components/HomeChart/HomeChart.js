import React,{useState,useEffect} from 'react'
import {stockNSymbols} from '../data_StockNSymbols'
import './HomeChart.css'
import Ticker from 'react-ticker'
import { Line } from 'react-chartjs-2';
import axios from '../../axios';
import Pusher from 'pusher-js'
// Redux
import {useDispatch,useSelector} from 'react-redux'
import {getSymbol,selectSymbol} from '../../features/TickerSymbolSlice'
import {getClose,selectClose} from '../../features/TickerCloseSlice'
import HomeChartInfo from './HomeChartInfo';

function HomeChart() {
    const dispatch = useDispatch()
    const tickerSymbols = useSelector(selectSymbol)
    const tickerClose = useSelector(selectClose)
    const [dailyDate, setDailyDate] = useState([])
    const [dailyClose, setDailyClose] = useState([])
    //For Active Buttons
    const [active,setActive] = useState('Apple Inc')

    const activeFunction = (value)=> {
        setActive(value.name)
        dispatch(getSymbol(value.value))
    }

    const [companyInfo, setCompanyInfo] = useState({})

    useEffect(() => {
        let dyDate=[]
        let dyClose=[]
        const pusher = new Pusher('1496afa72833a714308d', {
                cluster: 'us2'
            });
        async function fetchData() {
            const request = await axios.get(`/api/v1/stocks/${tickerSymbols}`);
            const requestCurrentPrice = await axios.get(`/api/v1/stocks/current/${tickerSymbols}`);
            dispatch(getClose(requestCurrentPrice.data))
            for (const dataObj of  request.data){
                dyDate.push(dataObj.Datetime.toString().substring(0,5))
                dyClose.push(parseFloat(dataObj.Close))
            }
            setDailyDate(dyDate)
            setDailyClose(dyClose)  
        }
        fetchData()
        
        var channel = pusher.subscribe('currentPrice');
                channel.bind('inserted', function(data) {
                    let dyDate=[]
                    let dyClose=[]
                    async function fetchData() {
                        const request = await axios.get(`/api/v1/stocks/${tickerSymbols}`);
                        const requestCurrentPrice = await axios.get(`/api/v1/stocks/current/${tickerSymbols}`);
                        dispatch(getClose(requestCurrentPrice.data))
                        for (const dataObj of  request.data){
                            dyDate.push(dataObj.Datetime.toString().substring(0,5))
                            dyClose.push(parseFloat(dataObj.Close))
                        }
                        setDailyDate(dyDate)
                        setDailyClose(dyClose)  
                    }
                    fetchData()
            });

            return ()=>{
                    channel.unbind_all()
                    channel.unsubscribe()
                }
        
    },[tickerSymbols,dispatch])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/api/v1/stocks/info/${tickerSymbols}`);
            setCompanyInfo(request.data[0])
        }
        fetchData()
    },[tickerSymbols])

    const data ={
        labels:dailyDate,
        datasets:[
            {
                label:`${tickerSymbols}`,
                data:dailyClose,
                fill:true,
                pointRadius: 0.5,
                borderColor:tickerClose[0].Close>tickerClose[1].Close?'rgb(207, 131, 131)':'rgb(92, 156, 111)',
                borderWidth:2,
                backgroundColor:[tickerClose[0].Close>tickerClose[1].Close?'rgb(223, 180, 180)':'rgb(176, 223, 190)'],
            }
        ]
    }

    return (
        <div className='homeChart'>
            {/* <Ticker>
                {({ index }) => (
                <>
                <div className='homeChart_Top'>
                {
                    Object.keys(stockNSymbols).map((key)=> {
                        return(
                            <p 
                            className={active === stockNSymbols[key].name ? 'activeButton': ''}
                            onClick={()=>activeFunction(stockNSymbols[key])}
                            >
                                {stockNSymbols[key].name}
                            </p>
                        )
                    })
                    }
                </div>
                </>
                )}
            </Ticker> */}
            <div className='homeChart_Top'>
                {
                Object.keys(stockNSymbols).map((key)=> {
                    return(
                        <p 
                        className={active === stockNSymbols[key].name ? 'activeButton': ''}
                        onClick={()=>activeFunction(stockNSymbols[key])}
                        >
                            {stockNSymbols[key].name}
                        </p>
                    )
                })
                }
            </div>
            <div className="homeChart_Chart">
                <Line data={data} options={{
                    legend: {
                        display: false
                        },
                    title:{text:'Demo App',display:false},
                    scales:{
                        yAxes:[
                            {
                                gridLines:{
                                    display:false
                                },
                                ticks:{
                                    autoSkip:true,
                                    beginAtZero:false
                                }
                            }
                        ],
                        xAxes:[
                            {
                                gridLines:{
                                    display:false
                                },
                                ticks:{
                                    autoSkip:true,
                                    maxTicksLimit:16,
                                    beginAtZero:false,
                                    maxRotation:0
                                }
                            }
                        ]
                    },
                    tooltips:{
                        displayColors:false,
                        xPadding:10,
                        callbacks:{
                            label:(tooltipItem,data)=>{
                                return `${active} - $${(Math.round(tooltipItem.value*100)/100)}`
                            }
                        }
                    },
                }}
                />  
                <HomeChartInfo  companyInfo = {companyInfo}/>            
            </div>
        </div>
    )
}

export default HomeChart
