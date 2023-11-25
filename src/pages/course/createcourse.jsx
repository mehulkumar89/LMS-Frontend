import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { Createcourse } from "../../Redux/slices/courseSlice"
import HomeLayout from "../../layout/Home"
import { AiOutlineArrowLeft } from "react-icons/ai"
function CreateCourse() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Image, setImage] = useState("")
    const [getcourse, setcourse] = useState({
        title: "",
        description: "",
        createdBy: "",
        category: "",
        thumbnail: null,
    })
    function handleImage(e) {
        e.preventDefault()
        const uploadurl = e.target.files[0]
        if (uploadurl) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadurl)
            fileReader.addEventListener("load", function () {
                setcourse({
                    ...getcourse,
                    thumbnail: uploadurl
                })
                setImage(this.result)
            })
        }

    }
    function handleCourse(e) {
        const { name, value } = e.target
        setcourse({
            ...getcourse,
            [name]: value
        })
    }
    async function handleform(e) {
        e.preventDefault()
        if (!getcourse.title || !getcourse.description || !getcourse.createdBy || !getcourse.category || !getcourse.thumbnail) {
            toast.error('Please fill all details')
            return
        }

        const response = await dispatch(Createcourse(getcourse))
        console.log(response)
        if (response?.payload?.success) {
            navigate('/courses')
            setcourse({
                title: "",
                description: "",
                createdBy: "",
                category: "",
                thumbnail: null
            })
        }

    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={handleform}
                    className="flex flex-col  justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    <Link className="absolute top-8 text-2xl link text-accent curser-pointer">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Create New Course
                    </h1>
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="curser-pointer">
                                    {Image ? (
                                        <img
                                            className="w-full h-44 m-auto border"
                                            src={Image}
                                        />
                                    ) : (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                        </div>
                                    )

                                    }
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={handleImage}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Course title
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={getcourse.title}
                                    onChange={handleCourse}

                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="createdBy">
                                    Instructor Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="createdBy"
                                    id="createdBY"
                                    placeholder="Enter Instrutor Name"
                                    className="bg-transparent px-2 py-1 border"
                                    value={getcourse.createdBy}
                                    onChange={handleCourse}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="category">
                                    Category
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Enter Course Category"
                                    className="bg-transparent px-2 py-1 border"
                                    value={getcourse.category}
                                    onChange={handleCourse}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Enter Course Description"
                                    className="bg-transparent px-2 py-1 h-24 resize-none border"
                                    value={getcourse.description}
                                    onChange={handleCourse}
                                />
                            </div>
                        </div>
                    </main>
                    <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}
export default CreateCourse