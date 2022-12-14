import React, {useState, useContext, useRef} from "react"
import {UserContext} from '../Context/UserProvider'
import './MemoriesForm.css'

const initInputs =     {
    title: '',
    message: '',
};
export default function MemoriesForm(){
    const [memory, setMemory] = useState(initInputs);
    // cost [selectedFile, setSelectedFile] = useState(null);
    const {addMemory} = useContext(UserContext);

    function handleChange(event){
        const { name, value } = event.target;
        setMemory((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            }
        });
        console.log(memory);
    }

    function handleSubmit(e){

        e.preventDefault()
        addMemory(memory)
        console.log(memory)
        setMemory(initInputs)
    }

    // function handleFileInput()


    

       
    const { title, message } = memory
    return(
        <form onSubmit={handleSubmit}>
            <div className="memForm">
                <input
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
                placeholder='Title'
                />
                <input
                type='text'
                name='message'
                value={message}
                onChange={handleChange}
                placeholder='message'
                />
                <input
                type='file'
                // value={selectedFile}
                // onChange={(e) => setSelectedFile(e.target.files[0])} 
                />
                <button onClick={addMemory}>Post Memory</button>
                
            </div>
        </form>
    )
}