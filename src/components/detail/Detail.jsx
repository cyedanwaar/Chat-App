import "./detail.css"
import { signOut } from "firebase/auth"
import { auth, db } from "../../lib/firebase"
import { toast } from "react-toastify"
import { useChatStore } from "../../lib/chatStore "
import { useUserStore } from "../../lib/userStore"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

export function Detail(){

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async ()=>{
        console.log("User Blocked Clicked")
        if(!user) return;

        const userDocRef = doc(db,"users", currentUser.id) 
        try {
      
            await updateDoc(userDocRef,{
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();

        } catch (err) {
            toast.error(err.message)
        }
    }

    return(
        <div className="detail">
            <div className="user">

                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h3>{user?.username || "User"}</h3>

            </div>

            <div className="info">

                <div className="option">

                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>

                </div>

                <div className="option">

                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>

                </div>

                <div className="option">

                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>

                    <div className="photos">
                        <div className="photoItem">

                            <div className="photoDetail">
                                <img src="./freen.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>

                            <img src="./download.png" alt="" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./freen.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>

                            <img src="./download.png" alt="" />
                        </div>

                    </div>

                </div>

                <div className="option">

                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>

                </div>

                <button onClick={handleBlock}>{
            isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "User Blocked" : "Block User"
            }</button>
                <button onClick={()=>auth.signOut()} className="logout">Logout</button>

            </div>
        </div>
    )
}