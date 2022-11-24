import './App.css';
// import {createContext} from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import MemoriesDisplay from './MemoriesDisplay/MemoriesDisplay.js';
import NavBar from './NavBar/NavBar.js'


function App() {
  // const UserContext = createContext()
  return (
    <div>
      <BrowserRouter>
        <NavBar />


       <Routes>

         <Route element={<Landing/>} exact path='/'></Route>

         <Route element={<About/>} path='/about'></Route>

         <Route element={<MemoriesDisplay/>} path='/Memories'></Route>

       </Routes>

      </BrowserRouter>
  
    </div>
  );
}

export default App;
