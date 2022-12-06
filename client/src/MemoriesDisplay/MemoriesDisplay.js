import React, { useContext } from 'react'
import MemoriesForm from '../MemoriesForm/MemoriesForm.js'
import MemoriesList from '../memoriesList/MemoriesList.js'
import { UserContext } from "../Context/UserProvider.js"
import { Link } from 'react-router-dom'

export default function MemoriesDisplay() {
const { user, token, } = useContext(UserContext)

  return (
    <div>
        <h1>Memories</h1>
        <p>Welcome to the Pensacoola Memories page!!!</p>

       { token ?  <MemoriesForm/> :  <div> <Link className='button' to="/login">Login & Post</Link> </div>}
        <MemoriesList/>

        </div>
  )
}
