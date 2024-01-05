import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
// import './Login.css'
import Cookie from "js-cookie"
import { AppContext } from "../../App"


export const StudentLogin = () => {

    const {  setStudentMatricNumber, setUserName, setStudentLevel,  setStudentDepartment,  setStudentFaculty, dbLocation, setLogin, setUserId  } = useContext(AppContext)
    const [ customError, setCustomError ] = useState('')
    const [ showPassword, setShowPassword ] = useState('password')


    const Navigate = useNavigate()

    useEffect(() => {
        setLogin(false)
        Navigate('/Student_login')
        Cookie.remove('userDetails', {path:'/'})
    }, [])
    
    
    // to validate the login inputs
    const schema = yup.object().shape({
        matricNumber: yup.string().required('Matric Number is required'),
        Password: yup.string().min(6).max(18).required()
    })
    useEffect(() =>{
        setCustomError('')
    }, [schema.Password, schema.matricNumber])
    
    // to handle the details of the form on submit
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const onLogin = async (data) => {
        await axios.get(`${dbLocation}/studentRegistration.php/students`).then(function(response) {
            let students = response.data

            students.forEach((student) => {
                if(student.matricNumber == data.matricNumber && student.password == data.Password){
                    Cookie.remove('userDetails', {path:'/'})
                    Cookie.set('userDetails', JSON.stringify(student), {
                        expires: 1,
                        sameSite:'strict',
                        secure: 'true'
                    })
                    const user = JSON.parse(Cookie.get('userDetails'))
                    setLogin(true)
                    setUserName(user.firstName + ' '+ user.lastName )
                    setStudentMatricNumber(user.matricNumber)
                    setStudentFaculty(user.faculty)
                    setStudentDepartment(user.department)
                    setStudentLevel(user.level)
                    setUserId(user.id)
                    Navigate(`/Student/${user.firstName} ${user.lastName}`)
                }
                else if(student.matricNumber == data.matricNumber && student.password != data.Password){
                    setCustomError("Incorrect Password")
                }
                else if(student.matricNumber != data.matricNumber && student.password == data.Password){
                    setCustomError("Incorrect Matric Number")
                }
               
            })
            // console.log(students)
        })

    }


    return (
        <div className="loginParent">

            <div className="login">
            <h1>Student Login</h1>
                <form className="form">
                    <input className="bg-blue" type="text" placeholder="Matric Number"  {...register('matricNumber')} />
                    <p className="error">{errors.matricNumber?.message}</p>
                    <input type={showPassword} placeholder="Password"  {...register('Password')}/>
                    <p className="error">{errors.Password?.message}</p>
                    <p className="error">{customError}</p>

                    <div className="passwordReveal" >
                    <input type="checkbox" name="" id="" onClick={() =>{
                        setShowPassword(showPassword == 'text' ? 'password' : 'text') 
                    }}/>
                    <p> Show Password </p>
                </div>

                    <button onClick={handleSubmit(onLogin)} className=''> 
                        Login 
                    </button>
                </form>
            <div className="loginImg">
                <img src="./istockphoto-1384437843-612x612.jpg" alt="Piss" />
            </div>

            </div>
            <button className="back" onClick={() =>{
                Navigate('/')
            }}
            >Back</button>
        </div>
    )
}