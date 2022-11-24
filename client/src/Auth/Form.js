import React from "react";

export default function Form(props){
    return(
        <form onSubmit={props.submit}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="student@bryanuniversity.edu" id="email" name="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)}/><br></br>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="username123" id="username" name="username" value={props.username} onChange={(e) => props.setUsername(e.target.value)}/><br></br>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="***********" id="password" name="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)}/><br></br>
            <button type="submit">SUBMIT</button>
        </form>
    )
}