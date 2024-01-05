import axios from "axios"
import { useState } from "react"
import { useContext, useEffect } from "react"
import { AppContext } from "../../App"


export const NoSubmits = ({examKey}) =>{
    const {  showResult, setShowResult, dbLocation } = useContext(AppContext)
    const [ no, setNo ]= useState(0)

    useEffect(() =>{
        const fetchResults = (examKey) =>{
            axios.get(`${dbLocation}/examResults.php/${examKey}`, examKey).then(function(response){
                setNo(response.data.length)
            }) 
        }
        fetchResults(examKey)
    }, [])

    return(
        <>{no}</>
    )
}

