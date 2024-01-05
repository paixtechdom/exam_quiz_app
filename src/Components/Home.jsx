import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import "./Home.css"
import { Link, useNavigate } from "react-router-dom"

export const Home = () =>{
    const { setLogin } = useContext(AppContext)
    const Navigate = useNavigate()

    useEffect(() => {
        setLogin(false)
        Navigate('/')
    }, [])
    return (
        <div className="home">
            <h1>
                Exam App
            </h1>
            <div>
                 <p>Select an Account</p>
                 <div>
                    <Link to='/Student_login'> Student </Link>
                    <img src="./images (1).jpeg" alt="" />
                    <Link to='/Login'> Admin </Link>
                 </div>
            </div>

        </div>
    )
}