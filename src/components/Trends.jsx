import React, {Fragment, useState, useEffect} from 'react'
import { useContext } from 'react';
import axios from 'axios'
import {AiFillPlayCircle} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {Container} from './Heading'
import '../Styles/Movies.css'
import NoImg from '../assets/images/no-image.png'

const Trends = () => {
  const {toggle} = useContext(Container)
  const [trendsData, setTrendsData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [trendTitle, setTrendTitle] = useState("")
  const Api = `https://api.themoviedb.org/3` 
  const TrendsShown = '/trending/all/week'
  const Images = 'https://image.tmdb.org/t/p/w500/'

  const TrendsCall = async() => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: '8eff6c778c43dc06f3c5842d701862b5',
      }
    })
    const results = data.data.results
    setTrendsData(results)
  }
  useEffect(() => {
    setTimeout(() => {
      TrendsCall()
    }, 100)
  })
  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className= {toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className='movies-container'>
          {trendsData.map((trend) => {
            return(
              <Fragment key={trend.id}>
                <div id={trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TrendTitle(trend)} />
                  <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg } alt='' onClick={() => TrendTitle(trend)}/>
                  <h3 id='smaller-Text' className= {toggle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>
                </div>
              </Fragment>
            )
          })}
        <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className= {toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)} />  
        </div>
      </div>
    </Fragment>
  )
}

export default Trends