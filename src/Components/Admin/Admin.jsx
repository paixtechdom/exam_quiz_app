import { useContext, useState } from "react"
import { AppContext } from "../../App"
import { ViewExams } from "../Dashboard/ViewExams"
import { Login } from "../Login"
import "./Admin.css"

export const Admin = () =>{
    const {  userName  } = useContext(AppContext)


    if(userName == 'admin' ){
        return (
            <div className="admin">
    
                <ViewExams />
                    {/* 
                    // SET TIMERS
                    // SEE PASSWORD
                    // ENCRYPT PASSWORD */}
            </div>
        )

    }
 
}