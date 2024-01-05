import axios from "axios"
import { useContext, useState } from "react"
import { AppContext } from "../../App"



export const NumberOfQuestions = ({examKey}) => {
    const [ noQuestions, setNoQuestions ] = useState(10)
    const { dbLocation, setSavedQuestions } = useContext(AppContext)


    useState(() =>{
        axios.get(`${dbLocation}/examquestions.php/${examKey}`, examKey).then(function(response){
            setNoQuestions((response.data).length)
        }) 
    }, [])
    


    return(
        <>
            {noQuestions}
        </>
    )
}   