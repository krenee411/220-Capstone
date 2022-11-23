import React from 'react';
import { useState } from "react";
import Login from "./Login"
import Signup from "./Signup"

export default function RenderForm(){
    const [form, setForm] = useState("login");

    const toggleForm = (formValue) => {
        setForm(formValue);
    }

    return(
        <div>
            {
                form === "login" ? <Login toggleForm={toggleForm}/> : <Signup toggleForm={toggleForm}/>
            }
        </div>
    )
}