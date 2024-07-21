import "./detail.css"
import { signOut } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { toast } from "react-toastify"

export function Detail(){

    

    return(
        <div className="detail">
            <div className="user">

                <img src="./avatar.png" alt="" />
                <h3>John Doe</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, porro!</p>

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

                <button>Block User</button>
                <button onClick={()=>auth.signOut()} className="logout">Logout</button>

            </div>
        </div>
    )
}