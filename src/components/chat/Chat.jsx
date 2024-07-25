import { useState, useEffect, useRef } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { onSnapshot, doc, arrayUnion, getDoc, updateDoc } from "firebase/firestore"
import {db} from "../../lib/firebase"
import { useChatStore } from "../../lib/chatStore "
import { useUserStore } from "../../lib/userStore"
import Upload from "../../lib/upload"


export function Chat(){
    const endRef = useRef(null)
    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"})
        console.log("Scroll should be working now...")
    }, [])

    const [open, setOpen] = useState(false)
    const [chat, setChat] = useState('')
    const [text, setText] = useState('')
    const [inputHeight, setInputHeight] = useState(60)
    const [showDiv, setShowDiv] = useState(false)
    const [showDivMsg, setShowDivMsg] = useState('')
    const [img, setImg] = useState({
        file: null,
        url: ""
    })

    const {currentUser} = useUserStore(); 
    const {chatId, user} = useChatStore(); 



    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "chats", chatId), (res)=>{
            setChat(res.data());
        })

        return (()=>{
            unSub()
        })
    },[chatId])

    const handleImgUpload = (e) =>{
        if(e.target.files[0]){
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    console.log(chat)

    const handleEmoji = e =>{
        setText(currentText =>{
        return currentText += e.emoji
        })
    }

    
    const inputRef = useRef(null)
    const inputTextRef = useRef(null)

    

    useEffect(()=>{
        const inputText = text.split("\n");
        inputText.forEach(line=>{
            inputTextRef.current.textContent = line
        })
        const textWidth = inputTextRef.current.offsetWidth
        const inputWidth = inputRef.current.offsetWidth

        console.log(textWidth < inputWidth - 45)

        if(text.endsWith('\n') && inputHeight < 200){
            setInputHeight(currentWidth=>{
                return currentWidth += 20
            })
            console.log("Yes r is pressed")
        }

        const newLines = text.split('\n').length - 1;

        if(newLines == 0){
            setInputHeight(currentWidth=>{
                return currentWidth = 60
            })
        }

        if(newLines == 1){
            setInputHeight(currentWidth=>{
                return currentWidth = 80
            })
        }

        
        if(newLines == 2){
            setInputHeight(currentWidth=>{
                return currentWidth = 100
            })
        }

        if(newLines == 3){
            setInputHeight(currentWidth=>{
                return currentWidth = 120
            })
        }

        if(newLines == 4){
            setInputHeight(currentWidth=>{
                return currentWidth = 140
            })
        }

        if(newLines == 5){
            setInputHeight(currentWidth=>{
                return currentWidth = 160
            })
        }

        if(newLines == 6){
            setInputHeight(currentWidth=>{
                return currentWidth = 180
            })
        }
        

    }, [text, inputRef]);


    function shDiv(){
        setShowDiv(true);
        setTimeout(() => {
            setShowDiv(false);
        }, 1000);
    }

    const sendButtonClicked = async () => {
        if(text){
            setShowDivMsg("Message Sent");
            shDiv();
            console.log(text);
            setText('');
        }else {
            setShowDivMsg("Empty Message");
            shDiv();
            return;
        }

        let imgUrl = null


        try{

            if(img.file){
                imgUrl = await Upload(img.file)
            }

            await updateDoc(doc(db,"chats",chatId), { 
                messages:arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && {img:imgUrl})
                }),
            });

            const userIds = [currentUser.id, user.id];


            userIds.forEach(async (id)=>{

                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if(userChatsSnapshot.exists()){
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats:userChatsData.chats,

                    });
                };

            });
            

        }catch(err){
            toast.error(err.message);
        };

        setImg({
            file: null,
            url: ""
        })

        setText("")
    }

    function showImage(){
        const img = document.getElementById('sent-image');
        img.classList.toggle('sent-image');
        img.classList.toggle('full-image');
    }

    useEffect(()=>{
        console.log(text);
        console.log(text.length);
    },[text]);

    return(
        <div id="chat" className="chat">

            { showDiv && <div style={showDivMsg=="Empty Message" ? {background: 'red'} : {} }  className="msgSent"> { showDivMsg } </div>}

            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quo tenetur neque! Veritatis, nulla praesentium vero expedita id laudantium dolorem!</p>
                    </div>
                </div>


                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>

            {/* Center Section */}
            <div className="center">

                {chat?.messages?.map(message=>(

                    <div className={message.senderId === currentUser.id ?"message own":"message" } key={message?.createdAt}>
                        {(message.senderId !== currentUser.id) && <img className="user-image" src={user.avatar} alt="" />}
                        {console.log("user", user)}
                        {console.log(message.img)}
                        <div className="texts">
                            {message.img &&<img onClick={showImage} id="sent-image" className="sent-image" src={message.img} alt="" />}
                            <p>{message.text}</p>
                            {/* <span>{message.createdAt}</span> */}
                        </div>
                    </div>
                ))}
                {img.url && <div className="message own">
                    <div className="texts">
                        <img src={img.url} alt="" />
                    </div>
                </div>}
                <div ref={endRef}></div>

            </div>

            {/* Bottom Section */}
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file"><img src="./img.png" alt="" /></label><input type="file" id="file" style={{display:"none"}} onChange={handleImgUpload} />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>

                <textarea style={{height:`${inputHeight}px`}} ref={inputRef} value={text} onChange={e=>{setText(e.target.value)}} placeholder="Type a message..."  name="" id="" ></textarea>
                <span ref={inputTextRef} className="hidden-span"></span>
                <div className="emoji icons">
                    <img onClick={()=>{setOpen(e=>!e)}} src={open ? "./minus.png" :"./emoji.png"} alt="" />
                    {open && <div className="emojiPicker"><EmojiPicker onEmojiClick={handleEmoji} /></div>}
                </div>

                <button onClick={sendButtonClicked} className="sendButton">Send</button>
            </div>
        </div>
    )
}