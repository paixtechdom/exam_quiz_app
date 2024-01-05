import axios from "axios"
import Cookie from "js-cookie"
import { useEffect } from "react"
import { useRef } from "react"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AppContext } from "../App"
import { ExamInterface } from "./ExamInterface"
import { Marking } from "./Student/Marking"
import { Student } from "./Student/Student"

const formatTime = (time ) =>{
    let hours = Math.floor(time/3600) % 24
    let minutes = (Math.floor(time/60) % 60)
    let seconds = Math.floor(time % 60)
    if(minutes < 10) minutes = '0' + minutes
    if(seconds < 10) seconds = '0' + seconds
    return hours + ':' + minutes + ':' + seconds
}

export const Exam = () => {
    const {  examQuestions, setExamQuestions, score, setScore, userName, studentMatricNumber, dbLocation, examKey, examTitle, setExamTitle, startedExam, setStartedExam, submitExam, showScore, examEnded, setExamEnded, setShowScore, setConfirm, setConfirmMessage, setConfirmFunction, markedExam, setMarkedExam, markExam, timerId, setMarking, studentLevel, studentFaculty, studentDepartment, setHideNavBar  } = useContext(AppContext)
 
    const [ correctAns, setCorrectAns ] = useState([])
    const navigate = useNavigate('/')
    const [ countdown, setCountdown ] = useState(5)
 
    useEffect(() =>{
        setHideNavBar(true)
        setExamQuestions('')
        setScore(0)
        setShowScore(false)
        setStartedExam(false)
        setExamEnded(false)
        setMarkedExam('false')
    }, [])
 

    useEffect(() =>{
        if(countdown == 1){
            setScore(0)
            setTimeout(() => {
                setMarkedExam('mark')
            }, 900);
        } 
    }, [countdown])
    useEffect(() =>{
        
        if(countdown == 0){
            clearInterval(timerId.current)
            setCountdown(10000)
            submitExam(score, examQuestions.length)
            setInterval(() => {
                setMarking(false)
            }, 3000);
        } 
    }, [countdown, submitExam])



//   const handleLeavePage = (event) => {
//     // submitExam(score, examQuestions.length)
//       if (document.visibilityState == 'hidden'){
//           setMarkedExam('mark')
//           console.log(score, 'hidden')
        
//     }
//     if (document.visibilityState == 'visible'){
//         console.log(score, 'visible')
//         setMarkedExam('false')
//         // submitExam(score, examQuestions.length)
//     }
//     };
    
//     useEffect(() => {
//         if(startedExam == true){
         
            
//             // Attach the event listener when the component mounts
//             // window.addEventListener('beforeunload', handleLeavePage);
//             window.addEventListener('visibilitychange', () =>{
//                 handleLeavePage()
//         });
//         // window.addEventListener('popstate', handleLeavePage);
    
//         // Remove the event listener when the component unmounts
//         return () => {
//         //   window.removeEventListener('beforeunload', handleLeavePage);
//           window.removeEventListener('visibilitychange', handleLeavePage);
//         //   window.removeEventListener('popstate', handleLeavePage);
//         };
//     }
//   }, [startedExam]);



    
   
    const startTimer = () =>{
        timerId.current = setInterval(() =>{
            setCountdown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }



    
    
    const fetchQuestions = async (examKey) =>{
        
        
        await axios.get(`${dbLocation}/examquestions.php/${examKey}`, examKey).then(function(response){
            const questions = response.data
            setStartedExam(true)
            const shuffledQuestions = questions.sort(() => Math.random() - 0.5)
            setExamQuestions(shuffledQuestions)
        }) 
        await axios.get(`${dbLocation}/exams.php/${examKey}/duration`).then(function(response){
            let res = response.data
            // setCountdown(5)
            setCountdown(res[0].duration)
        }) 
        startTimer()
    }
    
  const back = () =>{
    if(startedExam == true){
        setConfirm(true)
        setConfirmFunction('submitExam')
        setConfirmMessage(`Going back automatically submits the exam, do you want to submit?`) 
        setMarkedExam('mark')
    }else{
        navigate(`/Student/${userName}`)

    }
  }



    if(examTitle != ''){
        return (
            
            <div className="examination">
                <button  onClick={() => back()}
                    className="createExamBack">
                        Back
                    </button>

                <div className="studentInfo" style={{
                    position: 'sticky',
                    top: 0+'%',
                    backgroundColor: 'white',
                    paddingTop: 45+'px'
                }}>
                    <p  style={{
                        marginTop: 2+'px'
                    }}>
                        <b>
                            Matric Number: &nbsp;  
                        </b>
                            {studentMatricNumber}
                    </p> 
                {
                        
                        !startedExam &&
                        <>
                        <p>
                            <b>
                                Name: &nbsp;  
                            </b>
                                {userName}
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
                      
                        </>
                 }
                    <p>
                        <b>Exam: &nbsp; </b>
                        {examTitle}
                    </p>

                  
                   
                    {
                        startedExam &&
                       <p> Total Questions: {examQuestions.length == 0 ? '' : examQuestions.length} </p>
                    }
                    {
                        startedExam &&
                    <p>
                        <b>Time: &nbsp;</b>
                        {formatTime(countdown)}
                    </p>
                    }
                </div>
                {
                     startedExam == false &&
                        examEnded == false &&
                        
                        <button
                        onClick={() => {
                            fetchQuestions(examKey)
                            setScore(0)
                        }} className='success start'
                    
                        >Start</button>
        
                }
                {
                     startedExam == false &&
                        examEnded == false &&
                        
                        <Instruction />
        
                }

                    {
                        showScore &&
                        <div className="score">
                            <div>
                                <h3>Score</h3>
                            <p>
                                <span>{score}</span> right answer(s) 
                            </p>
                            <p>
                                <span>{examQuestions.length - score}</span> wrong answer(s)
                            </p>
                            <p>
                                Total number of questions: <span>{examQuestions.length}</span>
                            </p>
                            </div>
                        </div>
                     } 
                
                <div className="examInterfaceParent">

                    {
                        startedExam === true && 
                        <>
                        {examQuestions?.map((question, key) =>(
        
                        <div key={key} className='examQuestions'>
                            <ExamInterface totalNo={examQuestions.length} index={key + 1} question={question?.question} optionA={question?.optionA} optionB={question?.optionB} optionC={question?.optionC} optionD={question?.optionD} answer={question?.answer} correctAns={correctAns} setCorrectAns ={setCorrectAns} markedExam={markedExam} markExam={markExam} setMarkedExam={setMarkedExam} />
                        </div>
                        ))}
                        <button className="submit" onClick={() => {
                            setConfirm(true)
                            setScore(0)
                            setConfirmFunction('submitExam')
                            setConfirmMessage(`Do you want to submit?`) 
                            setMarkedExam('mark')
                        }}>
                            Submit
                        </button>
                        </>
        
                    }
                </div>
                    <Marking />
            </div>
        )
    }
    if(examTitle == ''){
        return(
            <Student />
        )

    }
}

export const Instruction = () =>{
    return(
        <div className="instruction">
            <h3>Instructions</h3>
            <ol>
                <li>All questions are multiple choice questions</li>
                <li>Each question carries equal marks</li>
                <li>Try to answer as quickly as you can</li>
                <li>If you press refresh, go to another tab or go back to the previous page, the exam will automatically be submitted </li>
                <li>Questions are displayed randomly for each student</li>
                <li>You will get your result immediately after the exam</li>
            </ol>
        </div>
    )
}