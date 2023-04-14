import React, {Fragment, useState, useEffect} from 'react'
import { useContext } from 'react';
import axios from 'axios'
import {AiFillPlayCircle} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import {Container} from './Heading'
import '../Styles/Movies.css'
import NoImg from '../assets/images/no-image.png'
import TrailerMovies from '../Trailers/TrailerMovies';

const Movies = () => {
  const {toggle, inputValue} = useContext(Container)
  const input = inputValue
  const [moviesData, setMoviesData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [movieTitle, setMovieTitle] = useState("")
  const Shown = input ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/movie` 
  const Images = 'https://image.tmdb.org/t/p/w500/'

  const MovieCall = async() => {
    const data = await axios.get(Api, {
      params: {
        api_key: '8eff6c778c43dc06f3c5842d701862b5',
        query: input
      }
    })
    const results = data.data.results
    setMoviesData(results)
  }
  useEffect(() => {
    setTimeout(() => {
       MovieCall()
    }, 100)
  
  })
  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }


  return (
    <Fragment>
      <div className= {toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className='movies-container'>
          {moviesData.map((movie) => {
            return(
              <Fragment >
                <div id={trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => MoviesTitle(movie)} />
                  <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg } alt='' onClick={() => MoviesTitle(movie)}/>
                  <h3 id={movie.title.length > 20 ? 'smaller-Text' : ''} className= {toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
                </div>
              </Fragment>
            )
          })}
        {trailer ? console.log : <TrailerMovies moviesTitle={movieTitle} toggle={toggle} />}  
        <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className= {toggle ? 'DarkTheme' : 'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={() => setTrailer(true)} />  
        </div>
      </div>
    </Fragment>
  )
}

export default Movies