
import './App.css';
import React, { useState } from 'react';
import { Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import Memories from './Memories/Memories.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'
import Profile from './Profile/Profile'

const getUserToken = () => {
  const string = sessionStorage.getItem('token')
  const token = JSON.parse(string);
  return token?.token
}

function App() {
  const [token, setToken] = useState(getUserToken)

  const setUserToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken)
  }
  
  return (
    <div>
       <NavBar />
       <Routes>
         <Route element={<Landing/>} exact path='/'></Route>
         <Route element={<About/>} path='/about'></Route>
         <Route element={<Memories/>} path='/Memories'></Route>
         <Route element={<RenderForm setToken={setUserToken}/>} path = '/login'></Route>
         <Route element={<Profile/>} path='/profile'></Route>
       </Routes>  
    </div>
  );
}

export default App;
