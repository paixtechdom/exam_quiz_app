import { useEffect } from "react"
import { useContext } from "react"
import { AppContext } from "../../App"
import  "./confirmBox.css"

export const ConfirmBox = () =>{
    const { confirm, confirmFunction, confirmMessage, setConfirm, Logout, examKeyTobeDeleted, deleteExam, questionTobeDeleted, deleteQuestion, submitExam, score, examQuestions, setShowScore, setMarkedExam, setStartedExam, setExamEnded, markExam, markedExam, setScore } = useContext(AppContext)

    // useEffect(() =>{
    //     if(confirmFunction == 'automaticExamSubmission'){
    //         submitExam(score, examQuestions.length)
    //     }
    // }, [confirmFunction])

    const confirmFunc = () =>{
        setConfirm(false)
        if(confirmFunction == 'Logout'){
            Logout()
        }
        if(confirmFunction == 'deleteExam'){
            deleteExam(examKeyTobeDeleted)
        }
        if(confirmFunction == 'deleteQuestion'){
            deleteQuestion(questionTobeDeleted)
        }
        if(confirmFunction == 'submitExam'){     

            submitExam(score, examQuestions.length)
            
            
        }
    }


        
    if(confirm){
        return(
            <div className="confirmBoxParent" onClick={() =>{
            }}>
                <div className="confirmBox">
                    <h2>{confirmMessage}</h2>
                    <div className="buttons ">
                        <button className="" onClick={() =>{
                            setConfirm(false)
                            setScore(0)
                            setMarkedExam('false')
                        }}>No</button>
                        <button className=""
                            onClick={confirmFunc}
                        >Yes</button>
                    </div>
                </div>
            </div>
    )
}
}