import React, { useContext, useEffect, useState } from 'react'
import MemoriesForm from '../MemoriesForm/MemoriesForm.js'
import MemoriesList from '../memoriesList/MemoriesList.js'
import { UserContext } from "../Context/UserProvider.js"
import { Link } from 'react-router-dom'

export default function MemoriesDisplay() {
  const [token, setToken] = useState('');

const localToken = localStorage.getItem('token')

useEffect(() => {
  async function fetchTokens() {
    const token = JSON.parse(localStorage.getItem('token'))
    setToken(token)
  }
  fetchTokens();
}, [localToken, token])


  return (
    <div>
        <h1>Memories</h1>
        <p>Welcome to the Pensacoola Memories page!!!</p>

       { token ?  <MemoriesForm/> :  <div> <Link className='button' to="/login">Login & Post</Link> </div>}
        <MemoriesList/>

        </div>
  )
}
