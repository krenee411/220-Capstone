import {useState } from 'react'
export default function UserToken(){
    
    const getUserToken = () => {
        const string = sessionStorage.getItem('token')
        const token = JSON.parse(string);
        return token?.token
    }

    const [userToken, setUserToken] = useState(getUserToken())

    const setToken = token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        setUserToken(token.token)
    }

    return {
        setUserToken: setToken, userToken
    }
}