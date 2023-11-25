import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function RequiredAuth({allow}){
 const {isLoggedIn,role}=useSelector((state)=>state.auth)
  return isLoggedIn && allow.find((myrole)=>myrole=== role)?(
   <Outlet/>
  ): isLoggedIn ? (<Navigate to="/denied" />):(<Navigate to="/login" />)
}
export default RequiredAuth