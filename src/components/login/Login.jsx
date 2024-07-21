import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {auth, db} from "../../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import Upload  from "../../lib/upload"

export function Login(){

    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    })

    const [loading, setLoading] = useState(false)

    const handleAvatar = e => {

        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
        
    }

    
    async function handleRegister(e){
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData);
        console.log(username, email, password)

        try{

            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await Upload(avatar.file)

            await setDoc(doc(db, "users", res.user.uid), {
                id: res.user.uid,
                username,
                email,
                avatar: imgUrl,
                blocked: [],
            })

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats:[],
            })

            toast.success("Account created successfully!")

        }catch(err){
            console.log(err)
            toast.error(err.message)
        }finally {
            setLoading(false)
            setAvatar({file:null,url:""})
            e.target.reset()
        }
    }
    
    async function handleLogin(e){
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData)
        console.log(email, password)
        
        try {
            
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Logged in successfully!")

        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }finally {
            setLoading(false)
            e.target.reset()
        }
    }
    
    return(
        <div className="login">

            <div className="item">

                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>Sign In</button>
                </form>

            </div>


            <div className="separator"></div>


            <div className="item">

                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input type="file" id="file" style={{display:"none "}} onChange={handleAvatar} required />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="email" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>Sign Up</button>
                </form>

            </div>

            { loading && <div className="loader">Loading</div>}

        </div>
    )
}