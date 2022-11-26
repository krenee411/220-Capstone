import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()



function addMemory(newMemory){
  userAxios.post("/memories", newMemory)
    .then(res => {
      setuserState(prevState => ({
        ...prevState,
        memory: [...prevState.memory, res.data]
      }))
    })
    .catch(err => console.log(err.response.data.errMsg))
}
