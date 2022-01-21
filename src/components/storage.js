import {React,useState} from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function Storagefile() {
    
    const [file, setfile] = useState()
    
let sendfile=()=>{

    const storage = getStorage();
    
    const metadata = {
      contentType: 'image/jpg'
    };
    let imgName = Math.random() * 2000*1223234;
    
    const storageRef = ref(storage, 'images/'  +file.name );
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
    
          // ...
    
          case 'storage/unknown':
            break;
        }
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );


}
    let handlechange =( e)=>{
        setfile(e.target.files[0])
        console.log(e.target.files[0])
    }
    return (
        <div>
            <input onChange={handlechange} type={"file"} />
        </div>
    )
}
