import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layout/Home"
import { useEffect } from "react"
import { getAllcourse } from "../../Redux/slices/courseSlice"
import CourseCard from "../../Components/coursecard"
function Allcourse(){
    const dispatch=useDispatch()
    const {courseData}=useSelector((state)=> state.course)
    async function loadcourse(){
        await dispatch(getAllcourse())
    }
    useEffect(()=>{
      loadcourse()
    },[])
    return(
    <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
           <h1 className="text-center text-3xl font-semibold mb-5">
            Explore the course made by &nbsp;
            <span className="font bold text-yellow-500">
                Industry experts
            </span>
           </h1>
           <div className="mb-10 flex flex-wrap gap-14">
               {courseData?.map((element)=>{
                return <CourseCard 
                    key={element._id}
                    data={element}
                />
               })}
           </div>
        </div>
    </HomeLayout>
   )
}
export default Allcourse