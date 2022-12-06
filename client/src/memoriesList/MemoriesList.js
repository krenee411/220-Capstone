import React, { useContext } from "react";
import Memory from "../Memory/Memory.js";
import { UserContext } from "../Context/UserProvider.js";

export default function MemoriesList(){
    const { memories } = useContext(UserContext)
    return(
        <div>
            { memories.map(memory =>{
                console.log(memory)
                return <Memory {...memory} key={memory._id} />}) }
        </div>
    )
}