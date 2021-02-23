import React,{useEffect,useState} from 'react'
import './HomeNews.css'
import {stockNewsObj} from '../data_StockNSymbols'
import NewsCard from './NewsCard'
import axios from '../../axios';

function HomeNews() {
    const [active,setActive] = useState('Nasdaq')
    const [activeValue,setActiveValue] = useState('^IXIC')
    const [newsData,setNewsData] = useState([])

    const activeFunction = (value)=> {
        setActive(value.name)
        setActiveValue(value.value)
    }

    useEffect(() => {
        async function fetchData() {
            if (active!=='Top Stories'){
                const requestNews = await axios.get(`/api/v1/stocks/daily/stock_index_news/${activeValue}`)
                setNewsData(requestNews.data)
            }
            
            // else{

            // }
        }
        fetchData()
    },[activeValue])

    return (

        <div className='homeNews'>
            <h2>Today's News</h2>
            <div className='homeNews_navbar'>
            {Object.keys(stockNewsObj).map((key,index)=>{
                return(
                   <div key={index} className='homeNews_navbarBut'>
                    <p className={active === stockNewsObj[key].name? 'homeNews_navbar_Active': ''}
                    onClick={()=>activeFunction(stockNewsObj[key])}
                    >{stockNewsObj[key].name}</p>
                    </div> 
                )
            })
            }
            </div>
            {newsData.map(news=>{
                return(
                    <NewsCard key={news.id} news={news}/>
                )
            })

            }
        </div>
    )
}

export default HomeNews
