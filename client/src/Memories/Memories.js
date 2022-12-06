import React from "react";

export default function Memories(props){
const {title, img_url, message, created} = props


    return (
        <div className="memories">

        <h1>{ title }</h1>

        {/* <img src={img_url} alt="hello"/> */}

        <h3 className='user-memories'>{ message }</h3>
        <p>{ created }</p>
        <div className='memories-btn'>
        </div>
    </div>
    
    )
}