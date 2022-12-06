import React, {useRef} from "react";

export default function FileUploader({onFileSelect}){

    const fileInput = useRef(null)

    function handleFileInput(e){
        //handle validations
        onFileSelect(e.target.files[0])
    }
    return(
        <div>
            <input type="file" onChange={handleFileInput}/>
            <button onClick={e => fileInput.current && fileInput.current.click()}></button>
        </div>
    )
}

