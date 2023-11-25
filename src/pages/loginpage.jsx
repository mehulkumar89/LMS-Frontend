import {useState}  from "react"
import HomeLayout from "../layout/Home"
import { BsPersonCircle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'
import { LoginAccount } from "../Redux/slices/authslice"
function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [loginData,setloginData]=useState({
        email:"",
        password:""
    })
    function handleUser(e){
       const{name,value}=e.target
       setloginData({
        ...loginData,
        [name]:value
       })
    }
    async function CreateUser(e){
        e.preventDefault()
        if(!loginData.email || !loginData.password){
            toast.error('Please fill all details')
            return
        }
        
        const response=await dispatch(LoginAccount(loginData))
        console.log(response)
        if(response?.payload?.success)
        navigate('/')

        setloginData({
        email:"",
        password:"",
        })
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form onSubmit={CreateUser} className="flex flex-col  justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        LOGIN PAGE</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold">EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ENTER YOUR MAIL"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUser}
                            value={loginData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-semibold">PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="ENTER YOUR PASSWORD.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUser}
                            value={loginData.password}
                        />
                    </div>
                    <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg curser-pointer">
                       Login
                    </button>
                    <p>
                        Not Have an account ? <Link to="/signup" className="link text-accent curser-pointer">SIGNUP</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Login