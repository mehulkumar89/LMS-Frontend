import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layout/Home"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { BiRupee } from "react-icons/bi"
import { verifyPayment } from "../../Redux/slices/authslice"
import { purchaseCourseBundle, getRazorpayId} from "../../Redux/slices/paymentslice"
import toast from "react-hot-toast"
const checkoutPage = function () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state?.auth)
  const key = useSelector((state) => state?.payment?.key)
  const subscription_id = useSelector((state) => state?.payment?.subscription_id)
  const isPaymentVerified = useSelector((state) => state?.payment?.isPaymentVerified)
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription: "",
    razorpay_signature: ""
  }

  async function handleSubscription(e) {
    e.preventDefault()
    if (!key || !subscription_id) {
      toast.error("something went wrong")
      return
    }
    const option = {
      key: key,
      subscription_id: subscription_id,
      name: "My Course pvt limited",
      description: "Subscription",
      theme: {
        color: '3F37254'
      },
      prefill: {
        email: userData.email,
        name: userData.fullname
      },
      handler: async function (response) {
          console.log(response)
          paymentDetails.razorpay_payment_id = response.razorpay_payment_id,
          paymentDetails.razorpay_subscription = response.razorpay_subscription_id,
          paymentDetails.razorpay_signature = response.razorpay_signature

         const resp= await dispatch(verifyPayment(paymentDetails))
         toast.success("payment successfull")
         resp?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/failed")
      }
    }
    const paymentObject = new window.Razorpay(option)
    paymentObject.open()
  }

  async function load() {
    await dispatch(purchaseCourseBundle())
    await dispatch(getRazorpayId())
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center text-2xl py-4 font-bold">
            Subscribe Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available Course
              of our platform for {" "}
              <span className="text-yellow-500 font-bold">
                1 year duration
              </span>{" "}
              All the existing and new launched Course will be also available
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /><span>199</span>only
            </p>
            <button type="submit" className="w-full py-2 mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 absolute bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg">
              Buy now
            </button>
          </div>
        </div>

      </form>

    </HomeLayout>
  )

}
export default checkoutPage