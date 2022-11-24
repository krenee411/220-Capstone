import React from "react";
import pic1 from './images/memoriesPic.jpg'

export default function Memories(){


    return (
        <div className="memories">
        <h1>Best Place to Visit Ever!!</h1>

        <img src={pic1} alt="hello"/>

        <h3 className='user-memories'>This is the Best Place that I've ever been too!!</h3>
        <p>11-24-2022</p>
        <div className='memories-btn'>
        <button className='delete-memories-btn'>Delete</button>
        <button className='update-memories-btn'>Update</button>
        </div>

        <h1>Bromancing With the Bros!!</h1>

<img src="https://www.gaytravel4u.com/wp-content/uploads/2019/02/Pensacola-Beach-Memorial-Day-Weekend-6.jpg" alt="hello"/>

<h3 className='user-memories'>Hot Brocation!!</h3>
<p>11-24-2022</p>
<div className='memories-btn'>
<button className='delete-memories-btn'>Delete</button>
<button className='update-memories-btn'>Update</button>
</div>
  
    </div>
    
    )
}