import './App.css';
import React, { useState } from 'react';
import { Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'
import MemoriesDisplay from './MemoriesDisplay/MemoriesDisplay.js';

function App() {
  const [token, setToken] = useState()

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
