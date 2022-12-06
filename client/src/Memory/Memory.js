import React from "react";

export default function Memory({title, img_url, message, created} ){
console.log(title)

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