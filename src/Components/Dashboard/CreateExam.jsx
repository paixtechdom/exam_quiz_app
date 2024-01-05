import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import "./createExamParent.css"
import { AppContext } from "../../App"
import { Login } from "../Login"
import { useNavigate } from "react-router"
import { EditQuestion } from "./EditQuestion"
import Cookie from "js-cookie"
import { ImportQuestions } from "./ImportQuestions"



export const CreateExam = () =>{

    const { dbLocation, examStatus, examTitle, examKey, savedQuestions, setSavedQuestions, login, setExamStatus, setExamKey, questionTobeDeleted, setQuestionTobeDeleted, setConfirm, setConfirmFunction, setConfirmMessage, fetchQuestions,  duration, setDuration } = useContext(AppContext)
    const [ showQuestionForm, setShowQuestionForm ] = useState(false)
    const [ showEditQuestion, setShowEditQuestion ] = useState(false)

    const [ question, setQuestion ] = useState('')
    const [ optionA, setOptionA ] = useState('')
    const [ optionB, setOptionB ] = useState('')
    const [ optionC, setOptionC ] = useState('')
    const [ optionD, setOptionD ] = useState('')
    const [ editAnswer, setEditAnswer ] = useState('')
    const [ questionId, setQuestionId ] = useState('')
    const [ questionNo, setQuestionNo ] = useState('')

    const [ time, setTime ] = useState()
    const [ answer, setAnswer ] = useState('')

    const navigate = useNavigate()
    let i =0
    useEffect(() =>{
        // setExamKey('admin5262023190')
       
        // const cookiedExamKey = Cookie.get('examKey')
        // setExamKey(cookiedExamKey)
        // fetchQuestions('admin44222023608')
        // setValue('examKey', 'admin44222023608')
        fetchQuestions(examKey)
        // setValue('examKey', examKey)
    }, [])
 
  

    
    const schema = yup.object().shape({
        question: yup.string().required('This field is required'),
        optionA: yup.string().required('This field is required'),
        optionB: yup.string().required('This field is required'),
        optionC: yup.string().required('This field is required'),
        optionD: yup.string().required('This field is required'),
    })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    
    
    const addQuestion = async  (data) =>{
        setValue('examKey', examKey)
        if(answer == 'optionA'){
            setValue('answer', data.optionA)
        }
        if(answer == 'optionB'){
            setValue('answer', data.optionB)
        }
        if(answer == 'optionC'){
            setValue('answer', data.optionC)
        }
        if(answer == 'optionD'){
            setValue('answer', data.optionD)
        }
        if(data.optionA == 0 || data.optionB == 0 || data.optionC == 0 || data.optionD == 0){
            alert('Options cannot be empty')
        }else{
            // To ensure the options are not the same
            if(data.optionA != data.optionB && data.optionA != data.optionC && data.optionA != data.optionD && data.optionB != data.optionC && data.optionB != data.optionD && data.optionC != data.optionD ){
                if(data.answer != undefined ){
                 await axios.post(`${dbLocation}/examquestions.php`, data).then(function() {
                        fetchQuestions(examKey)
                                
                        reset({
                            question:'',
                                optionA : '',
                                optionB: '',
                                optionC: '',
                                optionD: ''
                            })
                    })
            
                }else{
                    alert('Answer not selected')
                }
                
            }else{
                alert('Options Cannot be the same')
            }

        }
    }
    
    const addDuration = async () =>{
        let duration = document.querySelector('#duration').value
        await axios.post(`${dbLocation}/exams.php/${duration}/${examKey}`)
        setDuration(duration)
    }
    const updateExam = (examKey, status) =>{
        let appearance = 0
        let i = 0
        if(savedQuestions.length < 1 ){
            alert('Questions cannot be empty')
        }else{
            savedQuestions.forEach((question, index) =>{
    
                if(question.answer == 'Answer not selected'){
                    appearance = 1
                    i = index + 1
                }
                })
                
                if(appearance > 0){
                    alert('Answer Not Selected in no ' + i )
                    
                }
                else{
                    
                    if(status == 'Active'){
                    axios.post(`${dbLocation}/exams.php/${examKey}/Inactive`)
                    }else{
                        axios.post(`${dbLocation}/exams.php/${examKey}/Active`)
                    }
                    setExamStatus( examStatus == 'Active'? 'Inactive' : 'Active')
                    
                }
        }
    }




    if(examKey.length > 2){
        return (
            <div className="createExamParent">
                <button  onClick={() =>{
                        navigate('/admin')
                    }}
                className="createExamBack">
                    Back
                </button>
    
                <div className="top">
                    <div>
                        <h2>
                            {examTitle} 
                        </h2>
                        <button 
                            style={{
                                backgroundColor: examStatus == 'Active' && 'green',
                                border: examStatus == 'Active' && 'none',
                                color: examStatus == 'Active' && 'white'
                                }}
                            onClick={() => updateExam(examKey, examStatus)}>Exam is {examStatus}</button>
    
                    </div>


                    <div>
                            <ImportQuestions fetchQuestions={fetchQuestions} examKey ={examKey} setExamStatus={setExamStatus} examStatus={examStatus}/>
                    </div>


                    <div>
                        <button className="toggleQuestionForm" onClick={() =>{
                            setShowQuestionForm(!showQuestionForm)
                        }}> {showQuestionForm ? 'Hide Question input' : 'Add a Question'}</button>
                        <p>Duration: {
                                                duration == 30 ? '30 sec' : 
                                                duration == 120 ? '2 mins' : 
                                                duration == 300 ? '5 mins' : 
                                                duration == 900 ? '15 mins' : 
                                                duration == 1800 ? '30 mins' : 
                                                duration == 3600 ? '1 hr' : 
                                                duration == 5400 ? '1 hr 30mins' : 
                                                duration == 7200 ? '2 hrs'  :
                                                duration == 10500 ? '2 hrs 30mins'  :
                                                duration == 10800 && '3 hrs' 
                            }</p>
                        <select name="" id="duration" onChange={() =>{addDuration()}} required>
                            <option value="">Timer</option>
                            <option value="120">2 mins</option>
                            <option value="300">5 mins</option>
                            <option value="900">15 mins</option>
                            <option value="1800">30 mins</option>
                            <option value="3600">1 hr</option>
                            <option value="5400">1hr 30mins</option>
                            <option value="7200">2 hrs</option>
                            <option value="10500">2hrs 30mins</option>
                            <option value="10800">3 hrs</option>
                        </select>
                        

                    </div>
    
                </div>
    
                        
    
              
                {
                    showQuestionForm && 
                    <>
                       
                        <div className="questionParent">
        
                            <h3>Add a question</h3>
                            <div className="question">
                                <div>
                                    <input className="bg-blue invisible" type="text" placeholder="Enter Question"  {...register('question')}/> 
                                    <p className="error">{errors.question?.message}</p>
                                    <p>Answer: {
                                    answer == 'optionA' ? 'A' :
                                    answer == 'optionB' ? 'B' :
                                    answer == 'optionC' ? 'C' :
                                    answer == 'optionD' && 'D'
                                    }</p>
                                </div>
    
                                <div className="setOptions">
                                <div className="questionInput">
                                    <div>
                                        <input className="bg-blue invisible" type="text" placeholder="Enter Option A"  {...register('optionA')}/>
                                        <input type="radio" name="question" onClick={() => setAnswer('optionA')}/>
                                    </div>
                                     <p className="error">{errors.optionA?.message}</p>
                                </div>
                                <div className="questionInput">
                                    <div>
                                        <input className="bg-blue invisible" type="text" placeholder="Enter Option B"  {...register('optionB')}/>
                                        <input type="radio" name="question" onClick={() => setAnswer('optionB')}/>
                                    </div>
                                    <p className="error">{errors.optionB?.message}</p>
                                </div>
                                <div className="questionInput">
                                   <div>
                                        <input className="bg-blue invisible" type="text" placeholder="Enter Option C"  {...register('optionC')}/>
                                    <input type="radio" name="question" onClick={() => setAnswer('optionC')}/>
                                   </div>
                                    <p className="error">{errors.optionC?.message}</p>
                                </div>
                                <div className="questionInput">
                                    <div>
                                        <input className="bg-blue invisible" type="text" placeholder="Enter Option D"  {...register('optionD')}/>
                                        <input type="radio" name="question" onClick={() => setAnswer('optionD')}/>
                                    </div>
                                    <p className="error">{errors.optionD?.message}</p>
                                </div>
                                </div>
                            </div>
                                
                            <button className='save' onClick={handleSubmit(addQuestion)} > 
                                Add Question
                            </button>
        
                        </div>
                        
                </>
                }
    
    
               
       
    
                <div className="table">
                    <table>
                            <thead>
                                <tr>
                                    <th className="sn">S/N</th>
                                    <th>Question</th>
                                    <th>A</th>
                                    <th>B</th>
                                    <th>C</th>
                                    <th>D</th>
                                    <th>Answer</th>
                                    <th >Edit</th>
                                    <th >Delete</th>
                                </tr>
                            </thead>
                    {savedQuestions.map((question, key) => (
                                <tbody key={key}>
                                    <tr style={{
                                        backgroundColor: key % 2 == 0 ? 'white' :
                                        'rgba(0, 0, 0, 0.03)'
                                    }}>
                                        <td className="sn">{i += 1}</td>
                                        <td>{question.question}</td>
                                        <td>{question.optionA}</td>
                                        <td>{question.optionB}</td>
                                        <td>{question.optionC}</td>
                                        <td>{question.optionD}</td>
                                        <td>{question.answer}</td>
                                        <td className="opt">
                                            <div className="editTd">
                                            <button onClick={() =>{
                                                setShowEditQuestion(true)
                                                setQuestion(question.question)
                                                setOptionA(question.optionA)
                                                setOptionB(question.optionB)
                                                setOptionC(question.optionC)
                                                setOptionD(question.optionD)
                                                setQuestionId(question.id)
                                                setEditAnswer(question.answer)
                                                setQuestionNo(key+1)
                                            }}
                                             className="edit"
                                            >Edit</button>
                                           </div>
                                        </td>
                                        <td className="opt">
                                            <div className="editTd">
                                                <button onClick={() =>{
                                                        setQuestionTobeDeleted(question.id)
                                                        setConfirm(true)
                                                        setConfirmFunction('deleteQuestion')
                                                        setConfirmMessage(`Do you want to delete question ${key+1 }?`)
                                                        savedQuestions.length == 1 &&
                                                        axios.post(`${dbLocation}/exams.php/${examKey}/Inactive`).then(setExamStatus('Inactive')
                                                        )

                                                        
                                                        }} className="danger"> 
                                                        Delete
                                                    </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                ))
                            }
                        </table>
                </div>
                {
                    savedQuestions.length < 1 ? <p style={{
                        paddingLeft: 5+'%'
                    }}>No saved Question</p> :
                    ''
                }
                    {
                        showEditQuestion &&
                        <EditQuestion questionId={questionId} question={question} optionA={optionA} optionB={optionB} optionC={optionC} optionD={optionD} answer={editAnswer} setShowEditQuestion={setShowEditQuestion} questionNo={questionNo}
                        />
                    }
            </div>
    
        )
        
        } 
        if(examKey.length < 2){
            return(
                <button   onClick={() =>{
                        navigate('/admin')
                       
                    }}
                className="createExamBack">
                    Back
                </button>
            )
        }

    
}