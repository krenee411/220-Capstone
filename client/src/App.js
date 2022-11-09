import './App.css';
import {createContext} from 'react'
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Landing from './Landing/Landing.js';
import About from './About/About';
import Blog from './Blog/Blog';

const UserContext = createContext()
function App() {

  return (
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

    </div>
  );
}

export default App;
