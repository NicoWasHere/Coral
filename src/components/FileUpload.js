import React,{ useState,useEffect } from "react"
import firebase from "firebase"

// address is the folder where the media should go ("pfp" or "answers") uploadComplete is a function that fires with the upload path

export default ({address,doUpload,uploadComplete})=>{
    const[file,updateFile] = useState(null)

    useEffect(()=>{
        if(doUpload){
            if(file){
                uploadFile(file,address)
            }
            else{
                uploadComplete("None")
            }
        }
    },[doUpload])

    const uploadFile = (file,address) =>{
        const storage = firebase.storage().ref()
        // let fileRef = null;
        // do{
        const uuid = generate_UUID()
        let fileRef = storage.child(address+"/"+uuid)
        // }while((fileRef)=>{fileRef.getDownloadURL().then(res=>{
        //     return true
        // }).catch((err)=>{return false})})
        fileRef.put(file).then((snap)=>{
            snap.ref.getDownloadURL().then((url)=>{
                uploadComplete(url)
            })
        })
    }
    
    const generate_UUID = ()=>{
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    return(
        <div>
            <input type = 'file' accept="image/*" onChange={(e)=>updateFile(e.target.files[0])}></input>
        </div>
    )
}



