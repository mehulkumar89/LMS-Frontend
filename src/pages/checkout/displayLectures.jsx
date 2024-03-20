import { useEffect } from "react"
import HomeLayout from "../../layout/Home"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCourceLecture } from "../../Redux/slices/lectureSlice"
import LectureCard from "../../Components/lecture"
function DisplayLectures() {
    const {state}=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {lectures}=useSelector((state)=>state.lecture)
    const isloggedin=useSelector((state)=>state?.auth?.isLoggedIn)
    const role=useSelector((state)=>state?.auth?.role)

  useEffect(()=>{
     dispatch(getCourceLecture(state.data._id))
  },[])  
  return (
    <HomeLayout>
    <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5">
       <div className="text-center text-2xl font-semibold text-yellow-500">
        Course Name:{state.data.title}
       </div>
       {isloggedin && role=='ADMIN' &&
       <button onClick={()=>navigate('/course/lecture/add',{state:state.data._id})}
       className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300"   
       >
      Add Lecture</button>
       }
       <div className="mb-10 flex flex-wrap gap-14">
               {lectures?.map((element,index)=>{
                   return <LectureCard
                   key={element._id}
                   data={element}
                   _id={state.data._id}
                   ind={index}
               />
               })}
      </div>
    </div>
  </HomeLayout>
  )
}

export default DisplayLectures
