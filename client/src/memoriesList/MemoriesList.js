import React, { useContext } from "react";
import Memories from "../Memories/Memories.js";
import { UserContext } from "../Context/UserProvider.js";

export default function MemoriesList(){
    const { memories } = useContext(UserContext)
    return(
        <div>
            { memories.map(memories => <Memories {...memories} key={memories._id} />) }
        </div>
    )
}