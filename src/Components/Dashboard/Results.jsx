import axios from "axios"
import { useEffect } from "react"
import { useContext, useState } from "react"
import { AppContext } from "../../App"


export const Results = ({examResultTitle, examKey}) =>{
    const {  showResult, setShowResult, dbLocation } = useContext(AppContext)
    const [ results, setResults ] = useState([])
    const [ noQuestions, setNoQuestions ] = useState(10)

    useEffect(() =>{
        const fetchResults = (examKey) =>{
            axios.get(`${dbLocation}/examResults.php/${examKey}`, examKey).then(function(response){
                setResults(response.data)
            }) 
        }
        fetchResults(examKey)
    }, [])
    useEffect(() =>{
        axios.get(`${dbLocation}/examquestions.php/${examKey}`, examKey).then(function(response){
            setNoQuestions((response.data).length)
        }) 
    }, [results])



    return (
        <div className="resultsParent">
            <button className="back"
                onClick={() => {
                    setShowResult(false)
                }}
            >X</button>
            <div className="resultHead">
                <h2>Result of {examResultTitle}</h2>
                <p><b>Expected Score: {noQuestions}</b></p>

            </div>
            
            <table className="examList">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Matric Nmuber</th>
                            <th>Score</th>
                            <th>Department</th>
                            <th>Faculty</th>
                            <th>Level</th>
                            <th>Date</th>
                        </tr>
                    </thead>
            {results?.map((result, key) => (
                        
                        <tbody key={key}>
                            <tr>
                                <td>{key + 1}</td>
                                <td>
                                    {result.studentName}
                                </td>
                                <td>
                                    {result.matricNumber}
                                </td>
                                <td>
                                    {result.score}
                                </td>
                                <td>
                                    {result.department}
                                </td>
                                <td>
                                    {result.faculty}
                                </td>
                                <td>
                                    {result.level}
                                </td>
                                <td>
                                    {result.dateOfExamination}
                                </td>
                               
                            </tr>
                        </tbody>
                        
                        ))
                    }
            </table>
        </div>
    )
}