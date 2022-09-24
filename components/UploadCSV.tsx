import React, { useEffect, useState } from "react";
import Alert from "./Alert";

//Upwork Vladislav Metik

const UploadCSV = () => {
    const [fileName, setFileName] = useState<any>();
    const [alertVisible, setAlertVisible] = useState(false)

    const handleUpload = (e: any) => {
        setFileName(e.target.value.split("\\").slice(-1)[0])
        setAlertVisible(true)

        setTimeout(() => {
            setAlertVisible(false)
        }, 2000)
    }
    
    return(
        <>
            <input 
                className="m-10"
                type="file" 
                name="uploadCSV" 
                id="upload-cv" 
                accept=".csv" 
                onChange={(e) => handleUpload(e)} 
                required/>
            <Alert isVisible={alertVisible} fileName={fileName}/>
        </>

    )
}

export default UploadCSV