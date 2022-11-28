import './App.css';
import React , {useState} from 'react';
import { Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'
import MemoriesDisplay from './MemoriesDisplay/MemoriesDisplay.js';

function setToken(token) {
  sessionStorage.setItem('token', JSON.stringify(token));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();

  // if(!token){
  //   return <RenderForm setToken={setToken}/>
  // }
  
  return (
    <div>
       <NavBar />
       <Routes>
         <Route element={<Landing/>} exact path='/'></Route>
         <Route element={<About/>} path='/about'></Route>
         <Route element={<MemoriesDisplay/>} path='/Memories'></Route>
         <Route element={<RenderForm setToken={setToken}/>} path = '/login'></Route>
       </Routes>  
    </div>
  );
}

export default App;
