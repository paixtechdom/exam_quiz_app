import Cookie from "js-cookie"
import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "../App"
import { ChangePassword } from "./ChangePassword"
import { ConfirmBox } from "./ConfirmBox/ConfirmBox"

export const Navbar = () =>{
    const { startedExam, userName, setExamKey, login, setConfirm, logout, setConfirmMessage, setConfirmFunction, firstName, hideNavBar } = useContext(AppContext)
    const [ showChangePassword, setShowChangePassword]= useState(false)

    if(login && userName ){
        if(!hideNavBar){
            return(
                <div className="navbar">
                    {
                        !startedExam &&
                    <h3> {!firstName == 'Admin' ? '' : firstName.toUpperCase()} </h3> 
                    }
                    {/* <div> */}
                        {
                            !startedExam &&
                                <button className="logout"
                                onClick={() =>{
                                    setShowChangePassword(true)
                                }}
                                >
                                    Password
                                </button>
    
                        }
                        {
                            !startedExam &&
                            <button className="logout" onClick={() =>{                 
                                setConfirm(true)
                                setConfirmFunction('Logout')
                                setConfirmMessage('Do you want to Logout?')
                            }}>Logout</button>
                        }
                    {
                        startedExam &&
                    <h3> {firstName.toUpperCase()} </h3> 
                    }
                    {/* </div> */}
                    {
                        showChangePassword == true &&
                        <ChangePassword setShowChangePassword={setShowChangePassword}/>
                    }
    
                </div>
    
            )

        }
    }
}