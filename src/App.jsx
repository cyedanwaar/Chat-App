import { List }  from "./components/list/List";
import { Chat } from "./components/chat/Chat";
import { Detail }  from "./components/detail/Detail";
import { Login } from "./components/login/Login";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const App = () => {

  const user = true

  return (
    <div className='container'>

    {user && (
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