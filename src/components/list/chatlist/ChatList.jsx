import "./chatlist.css"
import { useEffect, useState } from "react"
import { AddUser } from "./addUser/AddUser"
import { useUserStore } from "../../../lib/userStore"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../../lib/firebase"

export function ChatList(){
    const [chats, setChats] = useState([])
    console.log(chats, typeof(chats))
    const [addMode, setAddMode] = useState(false)

    const {currentUser} = useUserStore()

    useEffect(()=>{

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res)=>{
            const items = res.data().chats;

            const promises = items.map( async (item)=>{
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef)

                const user = userDocSnap.data()

                return {...item, user}
            })

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));
        });

        return ()=>{
            unSub()
        }

    }, [currentUser.id])

    console.log(chats, typeof(chats))

    return(
        <div className="chatlist">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img onClick={()=>{setAddMode(e=>!e)}} className="add" src={addMode?"./minus.png":"./plus.png"} alt="" />
            </div>

            {chats.map(chat=>(
                <div className="item" key={chat.chatId}>
                    <img src={chat.user.avatar || "./avatar.png"} alt="" />
                    <div className="text">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
             ))} 
            

            {addMode && <AddUser/>}
        </div>
    )
}