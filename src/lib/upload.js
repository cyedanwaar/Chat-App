import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";


const Upload = async (file) =>{

    const date = new Date()

    const storageRef = ref(storage, `images/${date + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);


    return new Promise((resolve, reject)=>{

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
                    reject("Something went wrong! "+error.code)
                break;
                case 'storage/canceled':
                    reject("Something went wrong! "+error.code)
                break;
        
                case 'storage/unknown':
                    reject("Something went wrong! "+error.code)
                break;
            }
            },
            
            
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
            });
            }
        );

    }) 


}

export default Upload