import { Link } from 'react-router-dom'
import {React} from 'react'
import './NavBar.css'

export default function Navbar(){
    return(
    <div className='navbar'>
       <Link className='navLink' to="/">Home</Link>
       <Link className='navLink' to="/memories">Memories</Link>
       <Link className='navLink' to="/about">About</Link>
       <Link className='navLink' to="/profile">Profile</Link>
       <Link className='button' to="/login">Login</Link>
 </div>
    )
}