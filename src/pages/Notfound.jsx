import {useNavigate } from "react-router-dom"
function Notfound() {
    const navigate=useNavigate()
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-8xl tracking-widest font-extrabold text-white">
                404
            </h1>
            <div className="bg-black text-white my-10 px-2 text-sm rounded rotate-12 absolute">
                page not found..
            </div>
                <button onClick={()=>navigate(-1)} className="bg-green-500 mt-5 px-3  py-1 rounded-md font-semibold text-bold cursor-pointer hover:bg-green-400 transition-all ease-in-out duration-300">
                    Go Back
                </button>
        </div>
    )
}

export default Notfound