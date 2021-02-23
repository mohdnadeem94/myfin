import React from 'react'
import './NewsCard.css'

function NewsCard({news}) {
    return (
        <div className='news_card'>
            <div className='news_cardInfo'>
                <p className='news_cardInfoNews'>{news.title} <a target='_blank' style={{color:'gray'}} href={news.url}> Read More... </a> </p>
                <p className='news_cardInfoTime' style={{fontSize:'medium',fontFamily:'Cambria, Cochin, Georgia, Times, "Times New Roman", serif'}}> ⚡ {news.provider_name}  •𝕿𝖎𝖒𝖊 {new Date(news.provider_publish_time*1000).toString().slice(0,24)}</p>
            </div> 
            {
               news.thumbnail? <img src={news.thumbnail}/>:<img src="https://ecarrieres.com/wp-content/uploads/2020/01/Banque-finance-et-assurance-SALON.png"/>
            }
        </div>
    )
}

export default NewsCard
