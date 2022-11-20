import React from "react"

export default function MemoriesForm(){
    return(
        <form>
            <div>
            <input
                type='text'
                name='creator'
                // value={Creator}
                // onChange={handleChange}
                placeholder='Creator'
                />
                <input
                type='text'
                name='title'
                // value={title}
                // onChange={handleChange}
                placeholder='Title'
                />
                <input
                type='text'
                name='message'
                // value={message}
                // onChange={handleChange}
                placeholder='message'
                />
                <button>Post Memory</button>
                
            </div>
        </form>
    )
}