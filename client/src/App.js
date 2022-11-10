
import './App.css';
import {createContext} from 'react'
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About';
import Blog from './Blog/Blog';

const UserContext = createContext()
function App() {

  return (
<<<<<<< HEAD
    <div className="App">
    
=======
    <div>

       <BrowserRouter>
        <UserContext.Provider value={{}}>
          <Link to="/">Home</Link>

          <Link to="/blog">Blogs</Link>

          <Link to="/about">About</Link>

          <Routes>

            <Route element={<Landing/>} exact path='/'></Route>

            <Route element={<About/>} exact path='/about'></Route>

            <Route element={<Blog/>} exact path='/blog'></Route>

          </Routes>

        </UserContext.Provider>



       </BrowserRouter>

>>>>>>> 46e3ed21b72c193d7edb8d2455eafce9af0039a1
    </div>
  );
}

export default App;
