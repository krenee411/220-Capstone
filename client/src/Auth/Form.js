import React from "react";
import "./Auth.css"

export default function Form(props){
    if (props.submit.name === "handleLogin"){
        return (
            <div className="formBorder">
                <form  className= 'authForm' onSubmit={props.submit}>
                    <label className="formTag" htmlFor="email">Email</label>
                    <input type="email" placeholder="student@bryanuniversity.edu" id="email" name="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)}/><br></br>
                    <label className="formTag" htmlFor="username">Username</label>
                    <input type="text" placeholder="username123" id="username" name="username" value={props.username} onChange={(e) => props.setUsername(e.target.value)}/><br></br>
                    <label className="formTag" htmlFor="password">Password</label>
                    <input type="password" placeholder="***********" id="password" name="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)}/><br></br>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>   
        )
    } else {
        return(
            <div className="formBorder">
                <form  className= 'authForm' onSubmit={props.submit}>
                    <label className="formTag" htmlFor="email">Email</label>
                    <input type="email" placeholder="student@bryanuniversity.edu" id="email" name="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)}/><br></br>
                    <label className="formTag" htmlFor="username">Username</label>
                    <input type="text" placeholder="username123" id="username" name="username" value={props.username} onChange={(e) => props.setUsername(e.target.value)}/><br></br>
                    <label className="formTag" htmlFor="password">Password</label>
                    <input type="password" placeholder="***********" id="password" name="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)}/><br></br>
                    <label htmlFor="profilePic">Profile Pic</label>
                    <input type="text" id="profilePic" name="profilePic" value={props.profilePic} onChange={(e) => props.setProfilePic(e.target.value)}/><br></br>
                    <button type="submit">SUBMIT</button>
                </form>
            </div> 
        )
    }
}