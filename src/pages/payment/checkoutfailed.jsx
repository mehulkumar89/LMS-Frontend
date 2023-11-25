import {  AiFillAlert, AiFillCheckCircle, AiFillPhone } from "react-icons/ai"
import HomeLayout from "../../layout/Home"
import { Link } from "react-router-dom"

function checkoutFailed() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80 h-[24rem] flex-col jutify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute top-0 w-full py-3 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">
            Payment Failed
          </h1>
          <div className="px-4 py-5 absolute top-10 flex flex-col items-center justify-center space-y-14">
            <div className="space-y-2">
              <h2 className="text-lg  text-left font-semibold">
                Unable to Subscribe the course
              </h2>
              <h3 className="text-center">
              Try again
              </h3>
            </div>
          </div>
          <Link to='/' className="w-full  py-2 mt-12 text-center bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 absolute bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg">
            <button>Go to Dashboard</button>
          </Link>
        </div>

      </div>
    </HomeLayout>
  )
}
export default checkoutFailed