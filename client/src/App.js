
import './App.css';
import React, { useContext } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About.js';
import NavBar from './NavBar/NavBar.js'
import RenderForm from './Auth/RenderForm'
import MemoriesDisplay from './MemoriesDisplay/MemoriesDisplay.js';
import { UserContext } from "./Context/UserProvider.js"

// export const UserContext = createContext()



function App() {
  const { user, token} = useContext(UserContext)
console.log(user, token)

  // if(!token){
  //   return <RenderForm setToken={setToken}/>
  // }
  
  return (
    <div>
      {/* <UserContext.Provider value={{user, setUser}}> */}
       <NavBar />
       <Routes>
         <Route element={<Landing/>} exact path='/'></Route>
         <Route element={<About/>} path='/about'></Route>
         <Route element={<MemoriesDisplay/>} path='/memoriesDisplay'></Route>
         <Route element={token ? <Navigate to='/memoriesDisplay'/> : <RenderForm/>} path = '/login'></Route>
       </Routes>
       {/* </UserContext.Provider>   */}
    </div>
  );
}

export default App;
