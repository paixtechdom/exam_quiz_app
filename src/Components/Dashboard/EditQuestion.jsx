import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AppContext } from "../../App"


export const EditQuestion = ({question, optionA, optionB, optionC, optionD, questionId, answer, setShowEditQuestion, questionNo }) =>{
    const { dbLocation, fetchQuestions, examKey } = useContext(AppContext)
    const [ newAnswer, setNewAnswer ] = useState('')
    const [ newQuestion, setNewQuestion ] = useState('')
    const [ newOptionA, setNewOptionA ] = useState('vvv')
    const [ newOptionB, setNewOptionB ] = useState('')
    const [ newOptionC, setNewOptionC ] = useState('')
    const [ newOptionD, setNewOptionD ] = useState('')
    
    useEffect(() =>{
        setNewQuestion(question)
        setNewOptionA(optionA)
        setNewOptionB(optionB)
        setNewOptionC(optionC)
        setNewOptionD(optionD)
        setNewAnswer(answer)
    }, []) 
    useEffect(() =>{
        setValue('question', newQuestion)
        setValue('optionA', newOptionA)
        setValue('optionB', newOptionB)
        setValue('optionC', newOptionC)
        setValue('optionD', newOptionD)
        setValue('answer', newAnswer)
    }, [newQuestion, newAnswer, newOptionA, newOptionB, newOptionC, newOptionD])

    
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        
    })
    

    const updateExamQuestion = async (data) =>{
        if(data.answer.length < 1){
            alert('Answer Not Selected')
        }else{
            if(data.optionA == 0 || data.optionB == 0 || data.optionC == 0 || data.optionD == 0){
                alert('Options cannot be empty')
            }else{
                if(data.optionA != data.optionB && data.optionA != data.optionC && data.optionA != data.optionD && data.optionB != data.optionC && data.optionB != data.optionD && data.optionC != data.optionD ){
                    const response = await axios.post(`${dbLocation}/examquestions.php/${questionId}/save`, data).then(function() {
                        setShowEditQuestion(false)
                        fetchQuestions(examKey)
                    })
    
                }else{
                    alert('Options must be different')
                }
            }

        }
    }

    return(
        <div className="editQuestionParent">
            <div className="editQuestion">
                <h3 style={{
                    textAlign: 'center',
                    marginBottom: 35+'px'
                }}>Edit Question {questionNo}</h3>
                <div className="question">
                    <input type="text" onChange={(e) =>{
                        setNewQuestion(e.target.value)
                    }} value={newQuestion} required/>
                    <p className="label">Question</p>
                    <p className="newAnswer">New Answer Selected: <b>{newAnswer}</b></p>
                </div>

                <div className="setOptions">
                    <div className="questionInput">
                        <div>
                            <input type="text" onChange={(e) =>{
                                setNewOptionA(e.target.value)
                            }} value={newOptionA} required/>

                            <input type="radio" name="question" onClick={(e) => setNewAnswer(newOptionA)} onChange={() =>{
                            }} checked={answer == optionA && true}/>
                        </div>
                        <p className="label">Option A</p>
                    </div>
                    <div className="questionInput">
                        <div>
                            <input type="text" onChange={(e) =>{
                                setNewOptionB(e.target.value)
                            }} value={newOptionB} required/>

                            <input type="radio" name="question" onClick={() => setNewAnswer(newOptionB)} 
                            onChange={() =>{}}
                            checked={answer == optionB && true}/>

                        </div>
                        <p className="label">Option B</p>
                    </div>
                    <div className="questionInput">
                        <div>
                        <input type="text" onChange={(e) =>{
                            setNewOptionC(e.target.value)
                        }} value={newOptionC} required/>
                        <input type="radio" name="question" onClick={() => setNewAnswer(newOptionC) } 
                        onChange={() =>{}}
                        checked={answer == optionC && true}/>

                        </div>
                        <p className="label">Option C</p>
                    </div>
                    <div className="questionInput">
                        <div>
                        <input type="text" onChange={(e) =>{
                            setNewOptionD(e.target.value)
                        }} value={newOptionD } required/>
                        <input type="radio" name="question" onClick={() => setNewAnswer(newOptionD)} 
                        onChange={() =>{}}
                        checked={answer == optionD && true}/>

                        </div>
                        <p className="label">Option D</p>
                    </div>
                </div>
                <button className="editClose" onClick={() =>{
                        setShowEditQuestion(false)
                    }}>
                        X
                    </button>

                <div className="buttons">
                    <button className="save" onClick={handleSubmit(updateExamQuestion)}>
                        Save
                    </button>
                    
                </div>
            </div>

        </div>
    )

}