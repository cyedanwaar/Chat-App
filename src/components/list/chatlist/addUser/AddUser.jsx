import { collapseToast, toast } from "react-toastify"
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import "./addUser.css"
import { useState } from "react"
import { useUserStore } from "../../../../lib/userStore"

export function AddUser({addMode}){
    const [user, setUser] = useState(null)
    const {currentUser} = useUserStore()

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
            console.log(err)
            toast.error(err.message)
        }
    }

    async function handleAdd() {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
    
        try {
            // Create a new chat document reference
            const newChatRef = doc(chatRef);
    
            // Set the new chat document with initial data
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });
    
            // Update the userChats for the user
            const userDocRef = doc(userChatsRef, user.id);
            await updateDoc(userDocRef, {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            });
    
            // Update the userChats for the current user
            const currentUserDocRef = doc(userChatsRef, currentUser.id);
            await updateDoc(currentUserDocRef, {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });
        } catch (err) {
            console.log(err);
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
                <button onClick={handleAdd}>Add User</button>
            </div>}
        </div>
    )
}