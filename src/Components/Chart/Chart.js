import React,{useState,useEffect} from 'react'
import styles from './Chart.module.css'
import './Chart.css'
import axios from '../../axios'
import {Line} from 'react-chartjs-2';
import {selectSymbol} from './CompanySymbolSlice'
import {useSelector} from 'react-redux'
import CompareList from '../Test/CompareList';
import {timeValue,options} from '../data_timeperiod'

function Chart() {
    const companySymbol = useSelector(selectSymbol)

    const [currentTimeValue,setCurrentTimeValue] = useState(5)
    const [currentTimeValue_XAXIS,setCurrentTimeValue_XAXIS] = useState([])
    const [currentTimeValue_YAXIS,setCurrentTimeValue_YAXIS] = useState([])

    const [compare,setCompare] = useState(true)
    const [topButtons,setTopButtons] = useState(['5 days','10 days','1 month','6 months','1 year','Max'])

    const handleClick =(e)=>{
        let tempTimeValueObject = timeValue.find(o => o.name ===e.target.innerText);
        setCurrentTimeValue(tempTimeValueObject.value)
    }
    const differnce= (ary)=> {
        var newA = [];
        for (var i = 1; i < ary.length; i++) { 
        var eachValue = (ary[i] - ary[0])/ary[0]*100
        newA.push(Math.round(eachValue*100)/100)
        }
        return newA;
    }

    useEffect(() => {
        let xaxisDate=[]
        let yaxisClose=[]
        async function fetchStock_HPriceData() {
            const requestStock_HPrice = await axios.get(`/api/v1/stocks/price/${companySymbol}/${currentTimeValue}`)
            if (Object.keys(requestStock_HPrice.data).length<=280){
                for (const dataObj of requestStock_HPrice.data){
                var parts = dataObj.Date.split('-')
                var mydate = new Date(parts[0], parts[1] - 1, parts[2])
                // console.log(mydate.toDateString().substring(4,10))
                xaxisDate.unshift(mydate.toDateString().substring(4,10))
                yaxisClose.unshift(parseFloat(dataObj.Close))
                }
            }else{
               for (const dataObj of requestStock_HPrice.data){
                parts = dataObj.Date.split('-')
                mydate = new Date(parts[0], parts[1] - 1, parts[2])
                // console.log(mydate.toDateString().substring(11,16))
                xaxisDate.unshift(mydate.toDateString().substring(11,16))
                yaxisClose.unshift(parseFloat(dataObj.Close))
                } 
            }  
            setCurrentTimeValue_XAXIS(xaxisDate)
            setCurrentTimeValue_YAXIS(yaxisClose)
        }
        fetchStock_HPriceData()
    }, [currentTimeValue,companySymbol])

    //For Active Buttons
    const [active,setActive] = useState('5 days')
    const someFunct = (value)=> {
        setActive(value)
    }

    if(compare){
        var data = {
        labels:currentTimeValue_XAXIS,
        datasets:[
        {
            label:`${companySymbol}`,
            data:currentTimeValue_YAXIS,
            fill:true,
            pointRadius: 0.5,
            borderWidth:2
        },
    ],
    }
    }else{
        var data = {
        labels:currentTimeValue_XAXIS.slice(1,currentTimeValue_XAXIS.length),
        datasets:[
        {
            label:`${companySymbol}`,
            data:differnce(currentTimeValue_YAXIS),
            fill:false,
            pointRadius: 0.5,
            borderWidth:2
        },
    ],
    }
    }
    

    return (
        <div className ={styles.chart}>
            <div className={styles.chart_Timeline} onClick={handleClick}>
                {topButtons.map(btn=>{
                    return(
                    <p
                    className={active === btn ? 'activeButton': ''}
                    onClick={() => someFunct(btn)}>
                        {btn}
                    </p>)
                })}
            </div>
            {compare?
                <Line className='chart_Line'
                    data ={data}
                    options={options}
                />:
                <CompareList tickerSymbolDays = {currentTimeValue} dateXaxis = {currentTimeValue_XAXIS} dataInitial={data}/>
            }   
        </div>
    )
}

export default Chart


// else{
//         data = {
//             labels:currentTimeValue_XAXIS.slice(1,currentTimeValue_XAXIS.length),
//             datasets:[
//             {
//                 label:`${companySymbol}`,
//                 data:differnce(currentTimeValue_YAXIS),
//                 fill:false,
//                 pointRadius: 0.5,
//                 borderWidth:2,
//                 borderColor:'blue',
//             },
//             {
//                 label:'W',
//                 data:compareYAXIS,
//                 fill:false,
//                 pointRadius: 0.5,
//                 borderWidth:2,
//                 borderColor:'red',
//             },
//         ],
//         }
//     }

// useEffect(() => {
//         let yaxisClose=[]
//         async function fetchStock_CompareHPriceData() {
//             const requestStock_HPrice = await axios.get(`/api/v1/stocks/price/W/${currentTimeValue}`)
//             for (const dataObj of requestStock_HPrice.data){
//                 yaxisClose.unshift(parseFloat(dataObj.Close))
//             } 
//             setCompareYAXIS(differnce(yaxisClose))
//         }
//         fetchStock_CompareHPriceData()
//     }, [currentTimeValue])
//const [compareYAXIS,setCompareYAXIS] = useState([])

    //For calculating percentage difference
    // const differnce= (ary)=> {
    //     var newA = [];
    //     for (var i = 1; i < ary.length; i++) { 
    //     var eachValue = (ary[i] - ary[0])/ary[0]*100
    //     newA.push(Math.round(eachValue*100)/100)
    //     }
    //     return newA;
    // }