import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react"
import { AppContext } from "../../App"
import { EachAvailableExam } from "./EachAvailableExam"
import { StudentLogin } from "./StudentLogin"

export const AvailableExams = ({level, department, faculty, }) => {
    const { dbLocation, noAvailableExams, setNoAvailableExams, score, examQuestions, setCurrentExaminationKey, login, submitExam,  setHideNavBar } = useContext(AppContext)
    const [ isLoadingExams, setIsLoadingExams ] = useState(false)
    const [ exams, setExams ]= useState([])


    useEffect(() =>{
        fetchExams()
        setCurrentExaminationKey('')
        setIsLoadingExams(true)
        setHideNavBar(false)
    }, [])
    useEffect(() =>{
        let avEx = document.querySelector('.avEx')
        setNoAvailableExams(avEx.innerHTML)
    })

    const fetchExams = () =>{
        axios.get(`${dbLocation}/exams.php/`).then(function(response){
            const Exams = response.data
            const availableExams = Exams.filter(exam => {
                if(exam.level == level || exam.level == 'All'){
                    if(exam.department == department || exam.department == 'All'){
                        if(exam.faculty == faculty || exam.faculty == 'All'){
                            if(exam.status == 'Active'){
                                    setIsLoadingExams(false)
                                    return exam;                                    
                                }
                            }
                        }
                    
                    }
                })
                
            setExams(availableExams)
           

           
        }) 
    }
    if(login){
        return(
            <div className="availableExams">
                     <h2>Available Exams</h2>
            <div >
                {
                    isLoadingExams ? <p style={{
                        marginTop: 40+'px'
                    }}>
                        Fetching exams ...
                    </p> : ''
                }
                    {
                        !isLoadingExams && noAvailableExams.length == 0 &&
                        <p style={{
                            marginTop: 30+'px'
                        }}>No available Exam</p>
                    }
                    
                    <div className="avEx" >
                        {
                            !isLoadingExams ?
            
                            exams?.map((exam, key) =>(
                                <EachAvailableExam key={key} faculty={exam.faculty} examKey={exam.examKey} examTitle={exam.examTitle}/>
                                    
                            )) : ''
                        }
            
                    </div>
        
            </div>
                
    
            </div>
        )
    }
 
}   