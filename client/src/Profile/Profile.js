import React, { useState, useContext } from 'react'; 
import {UserContext} from '../Contexts/UserContext' 
function Profile() { 
    const [profilePic, setProfilePic] = useState(''); 
    // const [username, setUsername] = useState(''); 
    // const [email, setEmail] = useState(''); // 
    const [password, setPassword] = useState(''); 
    const { token } = useContext(UserContext) 
    console.log(token) 
    return ( 
    <> 
    <h1>Your Profile</h1>
    <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" alt="Girl in a jacket" width="250" height="150"/> 
    <div> 
        <h2>Username: {token}</h2>
        <h2>Email:</h2> 
        <h2>Password:</h2>
        </div> 
        <form> <label htmlFor="profilePic">Change Profile Pic</label> 
        <input type="text" placeholder="profilepic"/> 
        <label htmlFor="username">Change Username</label> 
        <input type="text" placeholder="username"/> 
        <label htmlFor="email">Change Email</label>
        <input type="email"/> 
        <label htmlFor="password">Change Password</label> 
        <input type="password"/> </form> </> ); 
        } 
    export default Profile;