import React,{useState,useEffect} from 'react'
import MarketStock from './MarketStock'
import  './MarketTrends.css'
import axios from '../../axios';

function MarketTrends() {
    let [active,setActive] = useState('Most Active')
    const [dataDailyMarket, setdata] = useState([])
    const headerList = ['Most Active','Gainers','Losers','Watchlist']

    const activeFunction = (value)=>{
        setActive(value)
    }
    
    useEffect(() => {
        async function fetchData() {
            if (active==='Most Active')
                {active='MostActive'}
            const request = await axios.get(`/api/v1/stocks/daily/${active}`);
            setdata(request.data)
        }
        fetchData()
    },[active])

    return (
        <div className='marketTrend'>
            <h2>Market Trends</h2>
                {/* <div className='marketTrend_Header marketTrend_HeaderActive'><p>Most Active</p></div> */}
                <div className='marketTrend_Header'>
                    {headerList.map(value=>{
                        return(
                            <p className={active===value?'marketTrend_HeaderActive':''}
                            onClick = {()=>activeFunction(value)}
                            >{value}</p>
                        )
                    })}
                </div>
            {dataDailyMarket.map(data=>{
                return (
                    <MarketStock data = {data}/>
                )
            })}
        </div>
    )
}

export default MarketTrends
