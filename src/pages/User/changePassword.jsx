import { useDispatch } from "react-redux"
import HomeLayout from "../../layout/Home"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPass } from "../../Redux/slices/authslice";

function ChangePassword(){
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const [pass,setpass]=useState({
       oldpass:"",
       newpass:"" 
   })
   function handlechange(e){
    const {name,value}=e.target
    setpass({
        ...pass,
        [name]:value
    })
   }
   async function Onsubmit(e){
    e.preventDefault()
    if(!pass.oldpass || !pass.newpass){
        toast.error('ALL FIELD REQUIRED')
        return
    }
    if(!pass.newpass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        toast.error('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        return
    }
    const result=await dispatch(forgotPass(pass))
    if(result?.payload){
        navigate("/")
    }
    else{
        toast.error('old password is incorrect..')
        toast.error('try again')
        return
    }

   }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
             <form
             onSubmit={Onsubmit}
             className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-80 min-h-[24rem] shadow-[0_0_10px_black]">
             <h1 className="text-center text-2xl font-semibold ">
                Change Password
             </h1>
             <div className="flex flex-col gap-1 ">
             <label htmlFor="oldpass" className="text-lg font-semibold">
                Old Password
             </label>
             <input
                type="password"
                name="oldpass"
                id="oldpass"
                placeholder="ENTER YOUR OLD PASSWORD"
                value={pass.oldpass}
                onChange={handlechange}
                className="bg-transparent px-2 py-1 border"
             />
            <label htmlFor="newpass" className="text-lg font-semibold">
                New Password
             </label>
             <input
                type="password"
                name="newpass"
                id="newpass"
                placeholder="ENTER YOUR NEW PASSWORD"
                value={pass.newpass}
                onChange={handlechange}
                className="bg-transparent px-2 py-1 border"
             />
             </div>
             <button type="submit"
             className="w-full py-1  px-2 rounded-sm font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                Change Password
             </button>
             </form>
        </div>
        </HomeLayout>
    )

}
export default ChangePassword