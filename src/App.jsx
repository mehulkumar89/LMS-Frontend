import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Homepage from './pages/homepage'
import Notfound from './pages/Notfound'
import Signup from './pages/siguppage'
import Login from './pages/loginpage'
import Allcourse from './pages/course/Allcoursespage'
import Contact from './pages/contactUs'
import Denied from './pages/Denied'
import CourseDese from './pages/course/courseDescription'
import RequiredAuth from './Components/auth/requiredAuth'
import CreateCourse from './pages/course/createcourse'
import Profile from './pages/User/profile'
import Editprofile from './pages/User/editprofile'
import ChangePassword from './pages/User/changePassword'
import CheckoutPage from './pages/payment/checkoutPage'
import CheckoutSuccess from './pages/payment/checkoutsuccess'
import CheckoutFailed from './pages/payment/checkoutfailed'
import DisplayLectures from './pages/checkout/displayLectures'
import Addlecture from './pages/checkout/addlecture'
function App() {
  return (
    <>
      <Routes>
      <Route element={<RequiredAuth allow={['ADMIN','USER']}/>}>
      <Route path="/course/create" element={<CreateCourse/>}></Route>
      <Route path='/payment' element={<CheckoutPage/>}></Route>
      <Route path="/checkout/success" element={<CheckoutSuccess/>}></Route>
      <Route path="/checkout/failed" element={<CheckoutFailed/>}></Route>
      <Route path="/user/profile" element={<Profile/>}></Route>
      <Route path="/course/lectures" element={<DisplayLectures/>}></Route>
      <Route path="/course/lecture/add" element={<Addlecture/>}></Route>
      </Route>
        <Route path="/course/description" element={<CourseDese/>}></Route>
        <Route path="/denied" element={<Denied/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/courses" element={<Allcourse />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/changePassword' element={<ChangePassword/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/user/edit" element={<Editprofile/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
    </>
  )
}

export default App
