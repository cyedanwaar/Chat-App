import { List }  from "./components/list/List";
import { Chat } from "./components/chat/Chat";
import { Detail }  from "./components/detail/Detail";
import { Login } from "./components/login/Login";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";


const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid)
      
    })

    return ()=>{
      unSub()
    }
  }, [fetchUserInfo])

  console.log(currentUser)

  if(isLoading)return(<div className="loader">Loading...</div>)

  return (
    <div className='container'>

    {currentUser && (
      <>
        <List/>
        <Chat/>
        <Detail/>
      </>
  ) || (
    <Login/>
  )}
    
    <ToastContainer position="bottom-right"/>

    </div>

  )
}

export default App