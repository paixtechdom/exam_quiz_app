import { useState, useContext, useEffect } from "react"
import { AppContext } from "../App"


export const ExamInterface = ({question, optionA,  optionB,  optionC,  optionD, answer, index, correctAnss, setCorrectAns, markedExam }) =>{

    const { score, setScore, submitExam, examQuestions, markExam, setMarkedExam } = useContext(AppContext)
    const [ answerChosen, setAnswerChosen ] = useState('')


    useEffect(() =>{
        if(markedExam == 'mark'){
            if(answerChosen == answer){
                setScore((prev) =>prev + 1 )
            }  
                       
        }
    }, [ markedExam])




    useEffect(() =>{
        setMarkedExam(true)

    }, [])

    // ********* scoring *********//
    // THE QUESTIONS MUST BE DISPLAYED RANDOMLY


    return(
        <div className="examInterface">
            <div className="question">
                <h3> <span>{index}.</span> Question: {question}</h3>
                <p>Answer Chosen: {answerChosen}</p>
            </div>
            <div className="options">
                <div className="option">
                    <input type="radio" name={question} id="" onClick={() => {
                        setAnswerChosen(optionA)
                    }}/>
                    <p>A. {optionA}</p>
                </div>
                <div className="option">
                        <input type="radio" name={question} id="" onClick={() => {
                        setAnswerChosen(optionB)
                        }}/>
                    <p>B. {optionB}</p> 
                </div>
                <div className="option">
                        <input type="radio" name={question} id="" onClick={() => {
                        setAnswerChosen(optionC)
                        }}/>
                    <p>C. {optionC}</p>
                </div>
                <div className="option">
                        <input type="radio" name={question} id="" onClick={() => {
                        setAnswerChosen(optionD)
                        }}/>
                    <p>D. {optionD}</p>
                </div>
            </div>

           
        </div>
    )
}