import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';

import { createContext, useState, useContext, useEffect, useId, useRef } from 'react';
import Cookie from 'js-cookie'
import axios from 'axios';
// import { Settings } from './Component/Settings/Settings';
import { Login } from './Components/Login';
import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { CreateExam } from './Components/Dashboard/CreateExam';
import { Exam } from './Components/Exam';
import { StudentLogin } from './Components/Student/StudentLogin';
import { StudentRegistration } from './Components/Student/StudentRegistration';
import { Student } from './Components/Student/Student';
import { Admin } from './Components/Admin/Admin';
import { ConfirmBox } from './Components/ConfirmBox/ConfirmBox';


export const AppContext = createContext()

const Layout = () =>{
  const Navigate = useNavigate()

  
  const checkUser = Cookie.get('userDetails')
  const [ login, setLogin ] = useState(false)
  const [ confirm, setConfirm ] = useState(false)
  const [ confirmMessage, setConfirmMessage ] = useState('')
  const [ confirmFunction, setConfirmFunction ] = useState('')
  const [ userName, setUserName ] = useState('') 
  const [ firstName, setFirstName ] = useState('') 
  const [ userId, setUserId ] = useState('') 
  const [ examKey, setExamKey ] = useState('') 
  const [ examinationKey, setExaminationKey ] = useState('') 
  const [ curentExaminationKey, setCurrentExaminationKey  ] = useState('') 
  const [ examStatus, setExamStatus ] = useState('') 
  const [ savedQuestions, setSavedQuestions ] = useState([])
  const [ examTitle, setExamTitle ] = useState('')
  const [ matricNumber, setMatricNumber ] = useState('')
  const [ studentName, setStudentName ] = useState('')
  const [ showResult, setShowResult ] = useState(false)
  const [ examKeyTobeDeleted, setExamKeyTobeDeleted ] = useState('')
  const [ questionTobeDeleted, setQuestionTobeDeleted ] = useState('')
  const [ examQuestions, setExamQuestions ] = useState([])
  
  const [ startedExam, setStartedExam ] = useState(false)
  const [ showScore, setShowScore ] = useState(false)
  const [ examEnded, setExamEnded ] = useState(false)
  const [ markedExam, setMarkedExam ] = useState('false')
  
  const [  duration, setDuration ] = useState(0)
  const [ exams, setExams ] = useState([])
  const [ score, setScore ] = useState(0)
  const [ studentMatricNumber, setStudentMatricNumber ] = useState('')
  const [ studentFaculty, setStudentFaculty ] = useState('')
  const [ studentDepartment, setStudentDepartment ] = useState('')
  const [ studentLevel, setStudentLevel ] = useState('')
  const [ noAvailableExams, setNoAvailableExams ]= useState([])
  const [ marking, setMarking ]= useState(false)
  const [ hideNavBar, setHideNavBar ]= useState(false)

  const dbLocation = 'http://localhost:80/api-quiz-app'



  
  // ON refresh set user details to the cookie saved
  useEffect(() =>{
      // if(login == false){
      //   Cookie.remove('userDetails', {path:'/'})
      // }
      const user = Cookie.get('userDetails')
      if(user != undefined){
      
        const userd = JSON.parse(Cookie.get('userDetails'))
        if(userd?.userName == 'admin'){
          setUserName('admin')
        }else{
          setUserName(userd?.firstName + ' '+ userd.lastName )
          setFirstName(userd?.firstName)
  
        }
        setStudentMatricNumber(userd.matricNumber)
        setStudentFaculty(userd?.faculty)
        setStudentDepartment(userd?.department)
        setStudentLevel(userd?.level)
        setUserId(userd?.id)
        setLogin(true)
      }


  }, [])

  // npm install bcryptjs --save
  const markExam = () =>{
  
  }

  // useEffect(() =>{
  //   if(markedExam == true && markExam){

  //   }

  // }, [markedExam])
  const timerId = useRef()


  const submitExam = (score, totalNoOfQuestions) =>{
    setScore(score)    
    setExamEnded(true) 
    setStartedExam(false) 
    clearInterval(timerId.current)
    setMarking(true)
    setTimeout(() => {
      setMarking(false)
      setShowScore(true)
      // axios.post(`${dbLocation}/examResults.php/save`, {
      //       score: score,
      //       examKey: examKey,
      //       matricNumber: studentMatricNumber,
      //       department: studentDepartment,
      //       faculty: studentFaculty,
      //       level: studentLevel,
      //       studentName: userName
      //     }).then(function(response){
            
      //       setMarkedExam(false)
      //     })
    }, 3000);

}


const Logout = () =>{
  if(userName == 'admin'){
      Navigate('/Login')
  }else{
      Navigate('/Student_login')

  }
  Cookie.remove('userDetails', {path:'/'})
  setLogin(false)
  setUserName('')
  setFirstName('')
  setConfirm(false)
  setStudentMatricNumber('')
}

const fetchExams = () =>{
  axios.get(`${dbLocation}/exams.php/`).then(function(response){
      setExams(response.data)
  }) 
}
const deleteExam = async (examKeyTobeDeleted) =>{
  const response = await axios.delete(`${dbLocation}/exams.php/${examKeyTobeDeleted}/delete`).then(function(){
    alert('Exam Deleted')
    fetchExams()
  })
  
}
const fetchQuestions = (newExamKey) =>{
  axios.get(`${dbLocation}/examquestions.php/${newExamKey}`, newExamKey).then(function(response){
      setSavedQuestions(response.data)
    }) 
  }
  
  const deleteQuestion = async (questionTobeDeleted) =>{
    const response = await axios.delete(`${dbLocation}/examquestions.php/${questionTobeDeleted}/delete`).then(function() {
      alert('Question Deleted')
      fetchQuestions(examKey)
    })
}



  return(
    <div className='app'>
   
        
        <AppContext.Provider value={{ userName, examKey, setExamKey,  examStatus, setExamStatus, setUserName, setLogin, login, examinationKey, setExaminationKey,savedQuestions, setSavedQuestions, examTitle, setExamTitle ,examQuestions, setExamQuestions, score, setScore, matricNumber, setMatricNumber, studentName, setStudentName, showResult, setShowResult, studentMatricNumber, setStudentMatricNumber, studentLevel, setStudentLevel, setUserId, userId, studentDepartment, setStudentDepartment, studentFaculty, setStudentFaculty, dbLocation, noAvailableExams, setNoAvailableExams, examinationKey, curentExaminationKey ,setCurrentExaminationKey, startedExam, setStartedExam, submitExam, examEnded, setExamEnded, showScore, setShowScore, confirm, setConfirm, confirmMessage, setConfirmMessage, confirmFunction, setConfirmFunction, Logout, examKeyTobeDeleted, setExamKeyTobeDeleted, deleteExam, fetchExams, exams, setExams, questionTobeDeleted, setQuestionTobeDeleted, deleteQuestion, fetchQuestions, duration, setDuration, markExam, markedExam, setMarkedExam, timerId, marking, setMarking, firstName, setFirstName, hideNavBar, setHideNavBar }}>
        <Navbar />
        <Outlet />
        <ConfirmBox />

      </AppContext.Provider> 

 
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Exam/:examTitle',
        element: <CreateExam />
      },
      {
        path: '/Examination/:examinationKey',
        element: <Exam />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/Student_login',
        element: <StudentLogin />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/Student/:username',
        element: <Student />
      },
      {
        path: '/Student_registration',
        element: <StudentRegistration />
      },
      {
        path: '/*',
        element: <Home />
      }
    ]
  }
])

function App() {
  
    return (
      <div className='App'>

          <RouterProvider router={router} /> 
      
      </div>
    )



}
export default App;
         