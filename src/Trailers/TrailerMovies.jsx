import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import "../Styles/TrailerMovies.css"

const TrailerMovies = (MoviesTitle) => {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] = useState("");

    function handleSearch() {
        setVideo(MoviesTitle)
	    movieTrailer(video).then((res) => {
	    setVideoURL(res);
	    });
    }
    useEffect(() => {
        handleSearch()
    }, [videoURL])
    return (
       <Fragment>
           <div className='Container'></div>
           <div className='player'>
              <ReactPlayer url={videoURL} controls={true}/>
	       </div>
       </Fragment>
    )
}

export default TrailerMovies