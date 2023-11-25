import {useState}  from "react"
import HomeLayout from "../layout/Home"
import { BsPersonCircle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'
import { CreateAccount } from "../Redux/slices/authslice"
function Signup() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [previewImage, setpreviewImage] = useState("")
    const [signupData,setsignupData]=useState({
        fullname:"",
        email:"",
        password:"",
        avatar:""
    })
    function handleUser(e){
       const{name,value}=e.target
       setsignupData({
        ...signupData,
        [name]:value
       })
    }
    function getImage(event){
         event.preventDefault()
         const uploadurl=event.target.files[0]
         if(uploadurl){
            setsignupData({
                ...signupData,
                avatar:uploadurl
            })
            const fileReader=new FileReader()
            fileReader.readAsDataURL(uploadurl)
            fileReader.addEventListener("load",function(){
                setpreviewImage(this.result)
            })
         }
    }
    async function CreateUser(e){
        e.preventDefault()
        if(!signupData.email || !signupData.fullname || !signupData.password){
            toast.error('Please fill all details')
            return
        }
        if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            toast.error('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
            return
        }
        const formData=new FormData();
        formData.append("fullname",signupData.fullname)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("avatar",signupData.avatar)
        
        const response=await dispatch(CreateAccount(formData))
        console.log(response)
        if(response?.payload?.success)
        navigate('/login')

        setsignupData({
        fullname:"",
        email:"",
        password:"",
        avatar:""
        })
        setpreviewImage("")
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={CreateUser} className="flex flex-col  justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        REGISTRATION PAGE</h1>
                    <label htmlFor="image_upload" className="curser-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input onChange={getImage} className="hidden" name="image_url" type="file" id="image_upload" accept=".jpg .jpeg .png .svg">
                    </input>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullname" className="font-semibold">FULLNAME</label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            placeholder="ENTER YOUR NAME"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUser}
                            value={signupData.fullname}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold">EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ENTER YOUR MAIL"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUser}
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>
                    <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg curser-pointer">
                       Create account
                    </button>
                    <p>
                        Already Have an account ? <Link to="/login" className="link text-accent curser-pointer">LOGIN</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
export default Signup