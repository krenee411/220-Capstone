import React from 'react';
import { useState } from "react";
import { Login } from "./AuthForm/Login"
import { Signup } from "./AuthForm/Signup"

export default function AuthForm(){
    const [form, setForm] = useState('login');

    return(
        <div>
            {
                form === "login" ? <Login/>: <Signup/>
            }
        </div>
    )
}