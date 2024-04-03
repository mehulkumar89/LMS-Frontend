import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {DeleteCourceLecture} from '../Redux/slices/lectureSlice'
 function LectureCard(data){
  const isloggedin=useSelector((state)=>state?.auth?.isLoggedIn)
  const role=useSelector((state)=>state?.auth?.role)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  async function deleting(id,ind){
    const val={
      id:id,
      index:ind
    }
    await dispatch(DeleteCourceLecture(val))
    navigate("/courses")
  }
return(
    <div className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">
    <div className="overflow-hidden">
      <video
       className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"
       src={data?.data?.lecture?.secure_url}
       controls
       alt="course thumbnail"
      />
      <div className="p-3 space-y-1 text-white">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
           {data?.data?.title}
          </h2>
          <p className="line-clamp-2">
           {data?.data?.description}
          </p>
      </div>
      {isloggedin && role=='ADMIN' &&
      <button
      className="w-full bg-red-600 relative bottom-18 left-0  font-bold rounded-bl-lg rounded-br-lg py-2 mt-12 text-center hover:bg-red-500 transition-all ease-in-out duration-300"
      onClick={()=>deleting(data?._id,data?.ind)}>Delete</button>
      }
    </div>
    </div>
)
}
export default LectureCard