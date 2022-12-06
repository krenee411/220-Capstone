import React, {useEffect, useState} from 'react'
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
    user: JSON.parse(localStorage.getItem('user')) || {},
     token: localStorage.getItem('token') || "",
     memories: [],
     errMsg: ''
    }

const [userState, setUserState] = useState(initState)

  function addMemory(newMemory){
    userAxios.post("/api/memories/new", newMemory)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          memories: [...prevState.memories, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }
  function getAllMemories(){
    userAxios.get("/public/memories/")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          memories: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  useEffect(() => {
    getAllMemories()
  }, [])
  return (
    <UserContext.Provider value={{...userState, setUserState, getAllMemories, addMemory}}>
      { props.children}
    </UserContext.Provider>
  )
}

