import React, { useState, useContext } from "react"
import Form from "./Form"
import PropTypes from 'prop-types'
import axios from 'axios'
import { UserContext } from "../Context/UserProvider.js"
import { useNavigate } from "react-router-dom"

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setUserState} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const request = {
            method: 'Post',
            url: 'http://localhost:9000/auth/login',
            proxy: {
              host: "http://localhost",
              port: 9000,
            },
            data:{
                email:email,
                username:username,
                password:password
            }
          };
        axios(request)
        .then((resp) => {
        //   setUserState(resp.data)
          const user = localStorage.setItem('user', JSON.stringify(resp.data.account));
          const token = localStorage.setItem('token', JSON.stringify(resp.data.token));
        //   setUserState(resp.data.account)

          setUserState(prevState => ({
            ...prevState,
            user: user,
            token:token
          }))
          navigate('/profile')
        })
    }

    return(
        <>
            <Form submit={handleLogin} username={username} password={password} email={email} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail}/>
            <h3>Don't have an account?</h3>
            <button onClick={() => props.toggleForm('signup')}>SIGNUP</button>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;