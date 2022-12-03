import React, {useState} from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const userAxios = axios.create()
    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

export default function UserProvider(props) {

  const initState = { 
    // user: JSON.parse(localStorage.getItem('user')) || {},
    //  token: localStorage.getItem('token') || "",
     memory: [],
     errMsg: ''
    }
const [userState, setuserState] = useState(initState)

  function addMemory(newMemory){
    userAxios.post("/api/memories", newMemory)
      .then(res => {
        setuserState(prevState => ({
          ...prevState,
          memory: [...prevState.memory, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  return (
    <UserContext.Provider value={{...userState, addMemory}}>
      { props.children}
    </UserContext.Provider>
  )
}

