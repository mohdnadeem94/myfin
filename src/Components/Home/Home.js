import React from 'react'
import HomeChart from '../HomeChart/HomeChart'
import HomeNews from '../HomeNews/HomeNews'
import NewsEarningsCalendar from '../HomeNews/NewsEarningsCalendar'
import MarketTrends from '../MarketTrends/MarketTrends'
import Navbar from '../NavBar/Navbar'
import'./Home.css'
import Footer from '../Footer/Footer'

function Home() {
    return (
        <div className='home'>
            <Navbar/>
            <HomeChart/>
            <div className='home_NewsNEarnings'>
                <HomeNews/>
                <NewsEarningsCalendar/>
            </div>
            <MarketTrends/>
            <Footer/>
        </div>
    )
}

export default Home
