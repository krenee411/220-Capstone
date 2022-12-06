
import './App.css';
import React, { useState, createContext } from 'react';
import { Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'
import MemoriesDisplay from './MemoriesDisplay/MemoriesDisplay.js';

export const UserContext = createContext()



function App() {
  const initUser = JSON.parse(localStorage.getItem('user')) || {};

  const [user, setUser] = useState(initUser)

  // if(!token){
  //   return <RenderForm setToken={setToken}/>
  // }
  
  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
       <NavBar />
       <Routes>
         <Route element={<Landing/>} exact path='/'></Route>
         <Route element={<About/>} path='/about'></Route>
         <Route element={<MemoriesDisplay/>} path='/memoriesDisplay'></Route>
         <Route element={<RenderForm/>} path = '/login'></Route>
       </Routes>
       </UserContext.Provider>  
    </div>
  );
}

export default App;
