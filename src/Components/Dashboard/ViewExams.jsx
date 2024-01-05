import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../App"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Results } from "./Results"
import { NumberOfQuestions } from "./NumberOfQuestions"
import { NoSubmits } from "./NoSubmits"
import { Exam } from "../Exam"
import Cookie from "js-cookie"
 

export const ViewExams = () =>{
    const [ examResultTitle, setExamResultTitle ] = useState('')
    const [ resultExamKey, setResultExamKey ] = useState('')
    const [ selectedFaculty, setSelectedFaculty ] = useState('')
    const { userName, setExamTitle, setExamKey, showResult, setShowResult, dbLocation, setExamStatus, examStyle, setExamStyle, setConfirm, setConfirmFunction, setConfirmMessage, setExamKeyTobeDeleted, exams, fetchExams, examKey,  duration, setDuration} = useContext(AppContext)
    const Navigate = useNavigate()
    const [ create, setCreate ] = useState('inAactiveH2')
    const [ all, setAll ] = useState('')


    const availableDepartments =    [
        {
            faculty: "Arts and Communication",
            department: [
                "Mass Communication",
                "Linguistics"
            ]
        },
        {
            
            faculty: "Pure and Applied Sciences",
            department: [
                "Computer Science",
                "Bio Chemistry"
            ]
        },
        {
            faculty: "Management Sciences",
            department: [
                "Accounting",
                "Banking And Finance"
            ]
        },
        {
            faculty: "Social Sciences",
            department: [
                "Transportation and Logistics",
                "Public Administration"
            ]
        }
    ]

    useEffect(() =>{
        fetchExams()
        Cookie.remove('examKey', {path:'/admin'})
    }, [])

    const schema = yup.object().shape({
        examTitle: yup.string().required('Exam Title is Required'),
        faculty: yup.string().required('Faculty Required'),
        department: yup.string().required('Department is Required'),
        level: yup.string().required('Level is Required'),

        })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })
 

    const createExam = async (data) => {
        let a = new Date().getMinutes()
        let b = new Date().getFullYear()
        let d = new Date().getSeconds()
        let e = new Date().getMilliseconds()
        let newExamKey = ( userName+ ''+a+''+d+''+b +''+e  )
        setValue('examKey', newExamKey)
        setValue('status', 'Inactive')
        reset({
            examTitle: '',
            faculty: '',
            level: ''
        })
        await axios.post(`${dbLocation}/exams.php`, data)
        setExamKey(newExamKey)
        setExamStatus('Inactive')
        setExamTitle(data.examTitle)
        fetchExams()
        // Cookie.set('examKey', examKey, {
        //     expires: 1,
        //     sameSite:'strict',
        //     secure: 'true'
        // })
        Navigate(`/Exam/${data.examTitle}`)
    }
    

    const updateExam = async (examKey, status) =>{
        if(status == 'Active'){
           await axios.post(`${dbLocation}/exams.php/${examKey}/Inactive`)
        }else{
           await axios.post(`${dbLocation}/exams.php/${examKey}/Active`)
        }
        fetchExams()
      
    }

    const [ examValue, setExamValue ] = useState('exam.level')
    const [ filterValue, setFilterValue ] = useState('')

    return (
        <div className='viewExams'> 
        <div className="h2s">
            <h2 className={create} onClick={() =>{
                document.querySelector('.adminSlide').style = 'transform: translateX(0%)'
                setAll('inAactiveH2')
                setCreate('')
            }}>Create Exam</h2>

            <h2 className={all} onClick={() =>{
                document.querySelector('.adminSlide').style = 'transform: translateX(-50%)'
                setAll('')
                setCreate('inAactiveH2')
            }}>All Exams</h2>
            {/* <h2 className="inAactiveH2" onClick={() =>{
                document.querySelector('.adminSlide').style = 'transform: translateX(-50%)'
                setAll('')
                setCreate('inAactiveH2')
            }}>Sort</h2> */}

        </div>



        {/* <div className="sortBy">
            <p>Sort by Level</p>

            <div>
                <input type="radio" name="level" id="level" value={100} onClick={(e) => {
                    if(e.target.checked){
                        setFilterValue(e.target.value)
                    }
                }}/>
                <label htmlFor="100">100</label>
            </div>
            <div>
                <input type="radio" name="level" id="level" value={200}  onClick={(e) => {
                    if(e.target.checked){
                        setFilterValue(e.target.value)
                    }
                }}/>
                <label htmlFor="200">200</label>
            </div>
            <div>
                <input type="radio" name="level" id="level" value={300}  onClick={(e) => {
                    if(e.target.checked){
                        setFilterValue(e.target.value)
                    }
                }}/>
                <label htmlFor="300">300</label>
            </div>
            <div>
                <input type="radio" name="level" id="level" value={'All'}  onClick={(e) => {
                    if(e.target.checked){
                        setFilterValue(e.target.value)
                    }
                }}/>
                <label htmlFor="All">All</label>
            </div>
        </div> */}



        <div className="adminSlide">
          <div className="createExam">
            <form action="">
                <label htmlFor="Exam Title">Exam Title</label>
                <input className="bg-blue invisible" type="text" placeholder="Exam Title"  {...register('examTitle')}/>
                <p className="error">{errors.examTitle?.message}</p>

                <label htmlFor="Faculty">Faculty</label>
                <select name="" id="" {...register('faculty')}  onClick={(e)=> {
                    setSelectedFaculty(e.target.value)
                            }}>
                    <option value=""  className="valueless">Faculty--</option>
                    {
                        availableDepartments.map((department, key) => (
                            <option key={key} value={department.faculty}>{department.faculty}</option>
                        ))
                    }
                    <option value="All">All</option> 
                </select>
                    <br />
                <p className="error">{errors.faculty?.message}</p>
                

                <label htmlFor="Department">Department</label>
                <select name="" id="" {...register('department')}>
                   
                        <option value=""  className="valueless">{selectedFaculty == '' ? 'Select a Faculty' : 'Department--'}</option>
                    {
                        availableDepartments.map((department, key) => (
                            department.faculty == selectedFaculty &&
                               
                            <>
                            <option key={key} value={department.department[0]}>{department.department[0]}</option>
                            <option key={key + 5} value={department.department[1]}>{department.department[1]}</option>
                            </>
                        ))
                    }
                    {
                        selectedFaculty !== '' &&
                    <option value="All">All</option>
                    }
                </select>
                    <br />
                <p className="error">{errors.department?.message}</p>


                <label htmlFor="Level">Level</label>
                <select name="" id="" {...register('level')}>
                    <option value="" className="valueless">Level--</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="All">All</option>
                </select>
                <p className="error">{errors.level?.message}</p>
               
                <button onClick={handleSubmit(createExam)} className='action create'> 
                    Create Exam
                </button>

            </form>
            <img src="./images.png" alt="Picture" />
        </div>


            <div className="examsParent">
             <div className="exams">
                {
                    exams.length == 0 &&
                    <h2>Empty List</h2>
                }
             {
                    exams.map((exam, key) =>(
                        

                        
                    <div className="exam" key={key} style= {{
                            backgroundColor: 
                            exam.faculty =='All' ? 'rgb(63, 4, 63, 0.4)' :
                            exam.faculty =='Arts and Communication' ? 'rgb(95, 7, 7, 0.4)' :
                            exam.faculty =='Pure and Applied Sciences' ? 'rgb(2, 2, 38, 0.4)' :
                            exam.faculty =='Management Sciences' ? 'rgb(39, 9, 4, 0.4)' :
                            exam.faculty =='Social Sciences' && 'rgb(4, 66, 4, 0.4)'                            
                            }}>

                        <div className="top">
                        <Link to = {`/Exam/${exam.examTitle}`} onClick={e =>{
                            setExamKey(exam.examKey)
                            setExamStatus(exam.status)
                            setDuration(exam.duration)
                           
                            setExamTitle(exam.examTitle)
                            }}> <h4>{exam.examTitle} <span>View Questions</span> ⇨</h4> </Link>
                            {/* <p>No: of Questions: <NumberOfQuestions examKey={exam.examKey}/></p> */}
                        </div>
                        <div className="bottom">
                            <div className="left">
                                {/* <p><span>Faculty</span> <br /> {exam.faculty}</p> */}
                                <button className="blue" onClick={() =>{ 
                                    setExamResultTitle(exam.examTitle)
                                    setResultExamKey(exam.examKey)
                                    setShowResult(true)
                                }}>
                                    <NoSubmits examKey={exam.examKey} /> resullts: View</button>
                            </div>
                            <div className="middle">
                                {/* <p><span>Department</span> <br /> {exam.department}</p> */}
                                {/* <button style={{
                                    backgroundColor: exam.status == 'Active' && 'green',
                                    border: exam.status == 'Active' && 'none',
                                    color: exam.status == 'Active' && 'white',
                                    padding: exam.status == 'Active' && '7px'
                                }} onClick={() => 
                                    updateExam(exam.examKey, exam.status)}>{exam.status} exam</button> */}

                            </div>
                            <div className="right">
                                {/* <p><span>Level</span> <br /> {exam.level}</p> */}
                                <button className="danger" onClick={() =>{
                                        setExamKeyTobeDeleted(exam.examKey)
                                        setConfirm(true)
                                        setConfirmFunction('deleteExam')
                                        setConfirmMessage(`Do you want to delete ${exam.examTitle}?`) 
                                    }}>Delete</button>

                            </div>
                        </div>

                    </div>
                    ))
                }
             </div>
        
            </div>

        </div>
            
          
            {
                showResult &&
                <Results examResultTitle={examResultTitle} examKey={resultExamKey}/>
            }
        </div>
    )
}