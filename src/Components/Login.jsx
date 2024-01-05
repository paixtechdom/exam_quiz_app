import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AppContext } from "../App"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
// import './Login.css'
import Cookie from "js-cookie"


export const Login = () =>{
    const { setUserName, setLogin, setUserId, setFirstName } = useContext(AppContext)
    const navigate = useNavigate()

    // to store users fetched
    const [ adminDetails, setAdminDetails ] = useState([])
 
    // to store error to be displayed if there is error in the login details
    const [ customError, setCustomError ] = useState('')
    const [ showPassword, setShowPassword ] = useState('password')
    // const navigate = useNavigate()
      
    useEffect(() =>{
        getAdminDetails()
        setLogin(false)
        navigate('/Login')
        Cookie.remove('userDetails', {path:'/'})
    }, [])

    
    // to fetch all users
    const getAdminDetails =  () =>{
        axios.get('http://localhost:80/api-quiz-app/admin/').then(function(response){
            setAdminDetails(response.data)
        }) 
    }
    // 192.168.43.44

    // to validate the login inputs
    const schema = yup.object().shape({
        userName: yup.string().required('Username is required'),
        Password: yup.string().min(6).max(18).required()
    })
    
    // to handle the details of the form on submit
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    // LOGIN FUNCTION
    const onLogin = (data) =>{
        // to fetch all users and check if the username and password matches an existing record
        if(data.userName == adminDetails[0].userName && data.Password == adminDetails[0].password){
            // to create and save a cookie of this user's details
            Cookie.remove('userDetails', {path:'/'})
            Cookie.set('userDetails', JSON.stringify(adminDetails[0]), {
                expires: 1,
                sameSite:'strict',
                secure: 'true'
            })
            const user = JSON.parse(Cookie.get('userDetails'))
            setUserName(user?.userName)
            setFirstName(user?.userName)
            setLogin(true)
            setUserId(user.id)
            navigate('/admin')
        }
        else{
            // setCustomError('Incorrect Username or password')
            // setTimeout(() => {
            //     setCustomError('')
            // }, 3000);
        }
}



    return (
        <div className="loginParent">
            <div className="login">
            <h1>Admin Login</h1>
            <form className="form">
                <input className="bg-blue" type="text" placeholder="Username"  {...register('userName')} />
                <p className="error">{errors.username?.message}</p>
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
                <img src="./images.jpeg" alt="Pics" />
            </div>
            </div>

            <button className="back" onClick={() =>{
                navigate('/')
            }}
            >Back</button>
        </div>
    )
}