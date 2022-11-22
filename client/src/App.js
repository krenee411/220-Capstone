import './App.css';
// import {createContext} from 'react'
import { Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import Memories from './Memories/Memories.js';
import NavBar from './NavBar/NavBar.js'
import Login from './AuthForm/Login';


function App() {
  // const UserContext = createContext()
  return (
    <div>
      
        <NavBar />


       <Routes>

         <Route element={<Landing/>} exact path='/'></Route>

         <Route element={<About/>} path='/about'></Route>

         <Route element={<Memories/>} path='/Memories'></Route>
         <Route element={<Login/>} path = '/login'></Route>

       </Routes>  
    </div>
  );
}

export default App;
