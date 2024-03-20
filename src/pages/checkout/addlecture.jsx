import { useDispatch } from "react-redux"
import HomeLayout from "../../layout/Home"
import { useState } from "react"
import toast from "react-hot-toast"
import { AddCourceLecture } from "../../Redux/slices/lectureSlice"
import {  useLocation, useNavigate } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"
function Addlecture() {
    const {state}=useLocation();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[data,setdata]=useState({
        previewImage:"",
        title:"",
        description:"",
        id:state,
        lecture:undefined,
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
                    lecture:uploadImage
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
        if(!data.lecture || !data.title || !data.description){
            toast.error('ALL FIELD REQUIRED')
            return
        }
        await dispatch(AddCourceLecture(data))
        navigate("/courses")
    }
  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
             <form
             onSubmit={Onsubmit}
             className="flex flex-col justify-center gap-5 rounded-lg p-6 text-white w-80 min-h-[24rem] shadow-[0_0_10px_black]">
             <h1 className="text-center text-2xl font-semibold ">
                Add Lecture
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
             <label htmlFor="title" className="text-lg font-semibold">
                Lecture Title
             </label>
             <input
                required
                type="text"
                name="title"
                id="title"
                placeholder="ENTER LECTURE TITLE"
                className="bg-transparent px-2 py-1 border"
                value={data.title}
                onChange={handlechange}
             />
             </div>
             <div className="flex flex-col gap-1 ">
             <label htmlFor="description" className="text-lg font-semibold">
                Lecture Description
             </label>
             <textarea
                required
                type="text"
                name="description"
                id="description"
                placeholder="ENTER LECTURE DESCRIPTION"
                className="bg-transparent px-2 py-1 h-24 resize-none border"
                value={data.description}
                onChange={handlechange}
             />
             </div>
             <button type="submit"
             className="w-full py-1  px-2 rounded-sm font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                Add Lecture
             </button>
             </form>
        </div>
    </HomeLayout>
  )
}

export default Addlecture
