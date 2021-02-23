import React ,{useState,useEffect} from 'react'
import axios from '../../axios';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import {Button} from '@material-ui/core';
import './NewsEarningsCalendar.css'

function NewsEarningsCalendar() {

    const today = new Date()
    let prevday = new Date(today)
    let nextday = new Date(today)

    if (today.getDay()===1) {
        today.setDate(today.getDate() + 1)
        prevday = new Date(today)
        nextday = new Date(today)
        prevday.setDate(prevday.getDate() - 2)
        nextday.setDate(nextday.getDate() + 1)
    } else if(today.getDay()===7) {
        today.setDate(today.getDate() - 1)
        prevday = new Date(today)
        nextday = new Date(today)
        prevday.setDate(prevday.getDate() - 1)
        nextday.setDate(nextday.getDate() + 2)
    } else{
        prevday.setDate(prevday.getDate() - 1)
        nextday.setDate(nextday.getDate() + 1)
    }
    

    const [date,setDate] = useState(today.toDateString().substring(4,15).replace(/\s/g, '-'))

    const dates = [
        prevday.toDateString().substring(4,10).replace(/\s/g, '-'),
        today.toDateString().substring(4,10).replace(/\s/g, '-'),
        nextday.toDateString().substring(4,10).replace(/\s/g, '-')
    ]
    // console.log(prevday.toDateString().substring(4,15).replace(/\s/g, '-'))
    // const dates = ['Dec-16','Dec-17','Dec-18']

    const [earnings,setEarnings] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`/api/v1/earnings/${date}`);
            setEarnings(request.data)
        }
        fetchData()
    },[date])

    const handleClick =(e)=>{
       setDate(`${e.target.innerText}-2020`)
    }

    return (
        <div className='news_Earnings'>
            <div  className='news_EarningsHeader'>
                <h2>Earnings Calendar</h2>
                <div className="news_EarningsDates">
                    {dates.map((date)=>{
                        return(
                            <Button name='val' onClick={handleClick}>{date}</Button>
                        )
                    })}
                </div>
            </div>
            <div className="newsEarningsDown">
                {earnings.map((data)=>{
                return(
                    <div className="newsEarningsDiv">
                        <CalendarTodayTwoToneIcon/>
                        <p className='IconDate'>{date.substring(4,6)}</p>
                        <div className="newsEarningsInfo">
                            <p className="newsEarningsName">{data.companyshortname}</p>
                            <p className="newsEarningsDate">{data.startdatetimetype==='AMC'||data.startdatetimetype==='BMO'?data.startdatetimetype:''}</p>
                            {data.epsactual!==null?<p className="newsEarningsEPS">{`Earnings Per Share ${data.epsactual}`}</p>:''}
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default NewsEarningsCalendar
