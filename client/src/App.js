
import './App.css';
import React, { useContext } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'

const getUserToken = () => {
  const string = sessionStorage.getItem('token')
  const token = JSON.parse(string);
  return token?.token
}

function App() {
  const [token, setToken] = useState()

  const setUserToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken)
  }
  
  return (
    <div>
      {/* <UserContext.Provider value={{user, setUser}}> */}
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
