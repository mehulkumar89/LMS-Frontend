import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layout/Home"
import { Link } from "react-router-dom"

function Profile() {
  const userData = useSelector((state) => state?.auth)
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[90vh]">
        <div className="my-10 w-112 flex flex-col  gap-4 rounded-lg p-4 text-white shadow-[0_0_15px_black]">
          <img
            src={userData.url}
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData.fullname}
          </h3>
          <div className="grid  grid-cols-2">
            <p>Email:</p><p>{userData.email}</p>
            <p>Role:</p><p>{userData.role}</p>
            <p>Subsription:</p><p>{userData.subscription===""?'inactive':userData.subscription}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changePassword"
              className="w-1/2 py-1 px-2 rounded-sm font-semibold  bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
              <button>
                Change Password
              </button>
            </Link>
            <Link
              to="/user/edit"
              className="w-1/2 py-1  px-2 rounded-sm font-semibold bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300">
              <button>
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

    </HomeLayout>
  )
}
export default Profile