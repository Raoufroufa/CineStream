import React, {Fragment, useState, useEffect} from 'react'
import { useContext } from 'react';
import axios from 'axios'
import {AiFillPlayCircle} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {Container} from './Heading'
import '../Styles/Movies.css'
import NoImg from '../assets/images/no-image.png'
import TrailerSeries from '../Trailers/TrailerSeries';

const Series = () => {
  const {toggle, inputValue} = useContext(Container)
  const input = inputValue
  const [seriesData, setSeriesData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [title, setTitle] = useState("")
  const Shown = input ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/tv` 
  const Images = 'https://image.tmdb.org/t/p/w500/'

  const SeriesCall = async() => {
    const data = await axios.get(Api, {
      params: {
        api_key: '8eff6c778c43dc06f3c5842d701862b5',
        query: input
      }
    })
    const results = data.data.results
    setSeriesData(results)
  }
  useEffect(() => {
    setTimeout(() => {
      SeriesCall()
    }, 100)
  })
  const serieTitle = (serie) => {
    setTitle(serie.name)
    setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className= {toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className='movies-container'>
          {seriesData.map((serie) => {
            return(
              <Fragment key={serie.id}>
                <div id={trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => serieTitle(serie)} />
                  <img src={serie.poster_path ? `${Images}${serie.poster_path}` : NoImg } alt='' onClick={() => serieTitle(serie)}/>
                  <h3 id={serie.name.length > 20 ? 'smaller-Text' : ''} className= {toggle ? 'mainColor' : 'secondaryColor'}>{serie.name}</h3>
                </div>
              </Fragment>
            )
          })}
        {trailer ? console.log : <TrailerSeries SeriesTitle={title} toggle={toggle} />}   
        <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className= {toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55}  cursor={'pointer'} onClick={() => setTrailer(true)} />  
        </div>
      </div>
    </Fragment>
  )
}

export default Series