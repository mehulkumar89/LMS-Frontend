import HomeLayout from "../layout/Home"
function Contact(){
     return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form className="flex flex-col  justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">
                        Contact US</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold">Name</label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ENTER YOUR NAME"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-semibold">EMAIL</label>
                        <input
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="ENTER YOUR Email"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="font-semibold">Message</label>
                        <textarea
                            className="bg-transparent border px-2 py-5 rounded-sm"
                            placeholder="ENTER YOUR MESSAGE"
                        />
                    </div>
                    <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg curser-pointer">
                       Submit
                    </button>
                </form>
            </div>
            </HomeLayout>
     )

}
export default Contact