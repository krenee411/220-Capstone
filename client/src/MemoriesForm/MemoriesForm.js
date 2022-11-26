import React, {useState} from "react"
import axios from "axios";

export default function MemoriesForm(){
    const {addMemory} = useContext(UserContext)
    const [memory, setMemory] = useState({
        title: '',
        message: '',
    });
    

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

    function addMemory(event){
        event.preventDefault()
        const newMemory = {
            title: memory.title,
            message: memory.title,
        };
        axios.post('/newmemory', newMemory);
        
    }
    return(
        <form>
            <div>
                <input
                type='text'
                name='title'
                value={memory.title}
                onChange={handleChange}
                placeholder='Title'
                />
                <input
                type='text'
                name='message'
                value={memory.message}
                onChange={handleChange}
                placeholder='message'
                />
                <button onClick={addMemory}>Post Memory</button>
                
            </div>
        </form>
    )
}