import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../App"

export const EachAvailableExam = ({examKey, examTitle, faculty}) =>{
    const { dbLocation, setExamKey, setStudentName, studentMatricNumber, noAvailableExams, setNoAvailableExams, setExamTitle, setHideNavBar } = useContext(AppContext)
    const [ appearance, setAppearance ]= useState(0)

    useEffect(() =>{
        // setHideNavBar(true)
        setAppearance(0)
        const fetchResults = () =>{
            axios.get(`${dbLocation}/examResults.php`).then(function(response){
                const results = response.data
                results.forEach(result => {
                    if(result.examKey == examKey && result.matricNumber == studentMatricNumber){
                        setAppearance(1)
                        setNoAvailableExams(result)
                    }else{
                    }
                })
            }) 
        }
        fetchResults()
        
    }, [])
    
    
    if(appearance < 1){
        
        return(
            <Link className="eachAvailableExam" to={`/Examination/:${examKey}`} 
              onClick={() =>{setExamKey(examKey)
                  setStudentName()
                  setExamTitle(examTitle)
                  // window.open(`/Examination/:${examTitle}/:${examKey}`)
              }}

              style= {{
                  backgroundColor: 
                  faculty =='All' ? 'rgb(63, 4, 63, 0.4)' :
                  faculty =='Arts and Communication' ? 'rgb(95, 7, 7, 0.4)' :
                  faculty =='Pure and Applied Sciences' ? 'rgb(2, 2, 38, 0.4)' :
                  faculty =='Management Sciences' ? 'rgb(39, 9, 4, 0.4)' :
                  faculty =='Social Sciences' && 'rgb(4, 66, 4, 0.4)'                            
                  }}
              >
                <div className="eachAvailableExam">
                    <b>{examTitle}</b>
                    <span>Take Exam ⇨</span>
                </div>
            </Link>
    )
}

}