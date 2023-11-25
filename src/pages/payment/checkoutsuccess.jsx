import {  AiFillAlert, AiFillCheckCircle, AiFillPhone } from "react-icons/ai"
import HomeLayout from "../../layout/Home"
import { Link } from "react-router-dom"

function checkoutSuccess() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex-col jutify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-green-500 absolute top-0 w-full py-3 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">
            payment successfull
          </h1>
          <div className="px-14 py-5 absolute top-10 flex flex-col items-center justify-center space-y-14">
            <div className="space-y-2">
              <h2 className="text-lg  text-left font-semibold">
                welcome to the my cources
              </h2>
              <h3>
              Now you can enjoy all the courses
              </h3>
            </div>
            <AiFillCheckCircle className="text-green-500 text-5xl" />
          </div>
          <Link to='/' className="w-full  py-2 mt-12 text-center bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300 absolute bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg">
            <button>Go to Dashboard</button>
          </Link>
        </div>

      </div>
    </HomeLayout>
  )
}
export default checkoutSuccess