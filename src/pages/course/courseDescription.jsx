import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../layout/Home";
import { useSelector } from "react-redux";
function CourseDese(){
    const {state}=useLocation();
    const navigate=useNavigate()
    const {role,subscription}=useSelector((state)=>state?.auth)
    useEffect(()=>{
        
    },[])
     return (
       <HomeLayout>
        <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
          <div className="grid grid-cols-2 gap-10 py-10 relative">
             <div className="space-y-5">
               <img
                 className="w-full h-64"
                 alt="thumbnail"
                 src={state.data.thumbnail.secure_url}
               />
               <div className="space-y-4">
               <div className="flex flex-col items-center justify-between text-xl">
                   <p className="font-semibold">
                       <span className="text-yellow-500 font-bold">
                        Total lecture: {" "}
                       </span>
                       {state.data.numberOfLectures}
                   </p>
                   <p className="font-semibold">
                       <span className="text-yellow-500 font-bold">
                        Instructor: {" "}
                       </span>
                       {state.data.createdBy}
                   </p>
               </div>
              </div>
             </div>
             <div className="space-y-2 text-xl">
             <h1 className="text-3xl font-bold text-yellow mb-5 text-center">
              {state.data.title}
             </h1>
             <p className="text-yellow-500">Course description:
             </p>
             <p>{state.data.description}</p>
             </div>
             {
              role==='ADMIN' || subscription==='active'?
              (<button onClick={()=>navigate('/course/lectures',{state:{...state}})} className="bg-yellow-500 px-4 py-1 font-semibold rounded-md w-full">
              WATCH</button>
             )
              :
              (<button onClick={()=>navigate('/payment')}  className="bg-yellow-500 px-4 py-1 font-semibold rounded-md w-full">
              SUBSCRIBE </button>)
              }
          </div>
        </div>
       </HomeLayout>
     )
}
export default CourseDese