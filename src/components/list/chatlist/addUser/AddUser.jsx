import { collapseToast, toast } from "react-toastify"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import "./addUser.css"
import { useState } from "react"

export function AddUser({addMode}){
    const [user, setUser] = useState(null)

    async function handleSearch(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')

        try {
            const userRef = collection(db, "users")
            const q = query(userRef, where("username", "==", username))

            const querySnapShot = await getDocs(q)
            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data())
            }
        }catch(err){
            toast.error(err.message)
        }
    }

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button>Add User</button>
            </div>}
        </div>
    )
}