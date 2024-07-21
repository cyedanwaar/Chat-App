import "./list.css"
import { ChatList } from "./chatlist/ChatList"
import { UserInfo } from "./userinfo/UserInfo"

export function List(){
    return(
        <div className="list">
            <UserInfo />
            <ChatList/>
        </div>
    )
}