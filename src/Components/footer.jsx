import {BsFacebook,BsInstagram,BsLinkedin,BsTwitter} from 'react-icons/bs'

function Footer(){
    const currDate=new Date()
    const year=currDate.getFullYear()
  return (
    <>
      <footer className='relative left-0 bottom-0 h-[20vh] py-5 flex flex-col sm:h-[10vh] sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-10'>
         <section className='text-lg'>
           Copyright {year} | All rights reserved
         </section>
         <section className='flex items-center justify-center gap-5 text-2xl text-white'>
           <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsFacebook/>
           </a>
           <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsInstagram/>
           </a>
           <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsTwitter/>
           </a>
           <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsLinkedin/>
           </a>
         </section>
      </footer>
    </>
  )
}

export default Footer