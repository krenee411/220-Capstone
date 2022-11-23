import './App.css';
import React, { useState } from 'react';
import { Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import Memories from './Memories/Memories.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'



function App() {
  const [token, setToken] = useState()

  if(!token){
    return <RenderForm setToken={setToken}/>
  }
  
  return (
    <div>
       <NavBar />
       <Routes>
         <Route element={<Landing/>} exact path='/'></Route>
         <Route element={<About/>} path='/about'></Route>
         <Route element={<Memories/>} path='/Memories'></Route>
         <Route element={<RenderForm/>} path = '/login'></Route>
       </Routes>  
    </div>
  );
}

export default App;
