import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layout/Home"
import { useState } from "react"
import toast from "react-hot-toast"
import { editprofile,fetchUser } from "../../Redux/slices/authslice"
import { Link, useNavigate } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlineArrowLeft } from "react-icons/ai"
function Editprofile(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[data,setdata]=useState({
        previewImage:"",
        fullname:"",
        avatar:undefined,
    })
    function handleImage(e){
        e.preventDefault()
        const uploadImage=e.target.files[0]
        if(uploadImage){
            const fileReader=new FileReader()
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener("load",function(){
                setdata({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadImage
                })
            })
        }
    }
    function handlechange(e){
        const {name,value}=e.target
        setdata({
            ...data,
            [name]:value
        })
    }
    async function Onsubmit(e){
        e.preventDefault();
        if(!data.avatar || !data.avatar){
            toast.error('ALL FIELD REQUIRED')
            return
        }
        if(data.fullname.length<5){
            toast.error('NAME MUST MORE THEN 5 LETTER')
            return
        }
        const formdata=new FormData()
        formdata.append("fullname",data.fullname)
        formdata.append("avatar",data.avatar)
        await dispatch(editprofile(formdata))
        await dispatch(fetchUser())
        navigate("/user/profile")
    }
     return(
        <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
             <form
             onSubmit={Onsubmit}
             className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-80 min-h-[24rem] shadow-[0_0_10px_black]">
             <h1 className="text-center text-2xl font-semibold ">
                Edit profile
             </h1>
             <label className="w-28 h-28 rounded-full m-auto " htmlFor="upload_img">
               {data.previewImage ? (
                <img
                src={data.previewImage}
                className="w-28 h-28 rounded-full m-auto"
                />

               ):(
                <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
               )}
             </label>
             <input 
             onChange={handleImage}
             className="hidden"
             type="file"
             id="upload_img"
             name="upload_img"
             />
             <div className="flex flex-col gap-1 ">
             <label htmlFor="fullname" className="text-lg font-semibold">
                Full Name
             </label>
             <input
                required
                type="text"
                name="fullname"
                id="fullname"
                placeholder="ENTER YOUR NAME"
                className="bg-transparent px-2 py-1 border"
                value={data.fullname}
                onChange={handlechange}
             />
             </div>
             <button type="submit"
             className="w-full py-1  px-2 rounded-sm font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                Update Profile
             </button>
             <Link
             to="/user/profile"
             >
             <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
               <AiOutlineArrowLeft/> Go Back to Profile
             </p>
             </Link>
             </form>
        </div>

        </HomeLayout>
     )
}
export default Editprofile