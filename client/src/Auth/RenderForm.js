import React from 'react';
import { useState } from "react";
import Login from "./Login"
import Signup from "./Signup"

export default function RenderForm(props){
    const [form, setForm] = useState("login");

    const toggleForm = (formValue) => {
        setForm(formValue);
    }

    return(
        <div>
            {
                form === "login" ? <Login toggleForm={toggleForm} setToken={props.setToken}/> : <Signup toggleForm={toggleForm} setToken={props.setToken}/>
            }
        </div>
    )
}