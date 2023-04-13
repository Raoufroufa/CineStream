import React, { Fragment, useState } from 'react'
import {NavLink} from "react-router-dom"
import {HiSearch} from "react-icons/hi"

import {Route, Routes} from "react-router-dom";

import Movies from "./Movies"
import Series from "./Series"
import Trending from "./Trends"
import Pricing from "./Pricing"

import "../Styles/Heading.css"

export const Container = React.createContext()

const Heading = () => {
  const [toggle, setToggle] = useState(true)
  const [inputValue, steInputValue] = useState('')

  return (
    <Container.Provider value={{toggle, inputValue}}>
         <Fragment>
            <nav className={toggle ? '' : 'navBarColor'}>
                <div className='nav-options'>
                    <h1 id={toggle ? '' : 'heading'}>CineStream</h1>
                    <NavLink to="/" style={({isActive}) => {return {color: isActive ? '#fff' : '#EE9B00'}}}>
                      <span id={toggle ? '' : 'Light'}>Movies</span>
                    </NavLink>
                    <NavLink to="/series" style={({isActive}) => {return {color: isActive ? '#fff' : '#EE9B00'}}}>
                      <span id={toggle ? '' : 'Light'}>Series</span>
                    </NavLink>
                    <NavLink to="/trending" style={({isActive}) => {return {color: isActive ? '#fff' : '#EE9B00'}}}>
                      <span id={toggle ? '' : 'Light'}>Trending</span>
                    </NavLink>
                    <NavLink to="/pricing" style={({isActive}) => {return {color: isActive ? '#fff' : '#EE9B00'}}}>
                       <span id={toggle ? '' : 'Light'}>Pricing</span>
                    </NavLink>
                </div>
                <div className='input-group'>
                    <input type='text' placeholder='Enter your search' onChange={(e) => steInputValue(e.target.value)}/>
                    <HiSearch fontSize={21} color='black' id='search'/>
                    <div id='Color-switcher' onClick={() => setToggle(!toggle)}>
                       <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
                    </div>
                </div>
            </nav>
            <Routes> 
                <Route path="/" element={<Movies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/pricing" element={<Pricing />} /> 
            </Routes>
       </Fragment>
    </Container.Provider>
    
  )
}

export default Heading