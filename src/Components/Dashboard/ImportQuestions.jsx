import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import { useContext, useState } from "react"
import { AppContext } from "../../App"

export const ImportQuestions = ({fetchQuestions, examKey, setExamStatus, examStatus}) =>{
    const { dbLocation } = useContext(AppContext)

    const schema = yup.object().shape({

    })
    
    const { register, handleSubmit, formState: {errors}, reset, setValue } = useForm({
        resolver: yupResolver(schema)
    })
    
    const [ doc, setDoc ] = useState(null)
  
    const setFile = (e) =>{
       const inputedFile = e.target.files[0]
       if(inputedFile == undefined){
           e.target.value = null
           setDoc(null)
          
       }else{
        if(inputedFile.type === 'text/csv' ){
            setDoc(inputedFile)
            
        }
        else{
            alert('File must be in csv format')
            e.target.value = null
        }
       }

       }
        
    const postFile = (data) =>{
        setValue('file', doc)
        axios.post(`${dbLocation}/examquestions.php/${examKey}/save`, data, {
            headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then(function(response) {
                    fetchQuestions(examKey)
                    alert('Questions successfully imported')
                    document.querySelector('#file').value = null
                    setDoc(null)
                    axios.post(`${dbLocation}/exams.php/${examKey}/Inactive`)
                    setExamStatus('Inactive')

                })
    }



    return(
        <>
            <input type="file" name="file" accept=".csv"  id="file" onChange={setFile}  style={{
                display: doc == null ? 'none' : 'block' 
            }}/>

            <button  style={{
                display: doc == null ? 'block' : 'none' 
            }}
             onClick={() =>{
                document.querySelector('#file').click()
            }}>
                Click to import questions 
            </button>

            <button name="file" onClick={handleSubmit(postFile)} 
                style={{
                    display: doc == null ? 'none' : 'block' 
                }}
            >Import</button>
        </>
    )
}