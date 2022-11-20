import './App.css';
// import {createContext} from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import Memories from './Memories/Memories.js';
import NavBar from './NavBar/NavBar.js'

function App() {
  // const UserContext = createContext()
  return (
    <div>
        <NavBar />

    <BrowserRouter>
       <Routes>

         <Route element={<Landing/>} exact path='/'></Route>

         <Route element={<About/>} path='/about'></Route>

         <Route element={<Memories/>} path='/Memories'></Route>

       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
