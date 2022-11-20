import { BrowserRouter, Link} from 'react-router-dom'
import {React} from 'react'

export default function Navbar(){
    return(
    <div className='navbar'>

    <BrowserRouter>

       <Link to="/">Home</Link>

       <Link to="/memories">Memories</Link>

       <Link to="/about">About</Link>

     </BrowserRouter>

 </div>
    )
}