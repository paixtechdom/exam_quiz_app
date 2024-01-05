import { useContext, useEffect } from "react"
import { AppContext } from "../../App"
import { AvailableExams } from "./AvailabeExams"
import { StudentLogin } from "./StudentLogin"
import "./Student.css"
import { useNavigate } from "react-router"



export const Student = () =>{

    const { userName, studentMatricNumber, studentLevel, studentDepartment, studentFaculty, login, setStartedExam, setExamEnded } =useContext (AppContext)
    const navigate = useNavigate()

    useEffect(() =>{
        // setStartedExam(false)
        // setExamEnded(true)

        // navigate(`/Student/${userName}`)
    }, [])
    if(login){
        return(
            <div className="studentParent">
                <div className="studentInfo">
                    <p>
                        <b>
                            Name: &nbsp;  
                        </b>
                            {userName}
                    </p> 
                    <p>
                        <b>
                            Matric Number: &nbsp;  
                        </b>
                            {studentMatricNumber}
                    </p> 
                    <p>
                        <b>
                            Level:  &nbsp; 
                        </b>
                             {studentLevel} <br />
                    </p> 
                    <p>
                        <b>
                            Faculty: &nbsp; 
                        </b>
                            {studentFaculty} <br />
                    </p> 
                    <p>
                        <b>
                            Department: &nbsp; 
                        </b>
                             {studentDepartment} <br />
                    </p> 
                </div>
    
                <AvailableExams level={studentLevel} department={studentDepartment} faculty={studentFaculty}/>
            </div>
    
            /* shift + alt + a - open comment */
            
    
        )

    }

    // if(userName == '' ){
    //     return (
    //        <StudentLogin />
    //     )

    // }
}
