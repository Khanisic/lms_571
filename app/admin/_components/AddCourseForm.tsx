"use client"
import { createCourse } from "@/lib/actions/course.actions";
import { useState } from "react"
import { useRouter } from "next/navigation";

//lmscs571
const AddCourseForm = () => {
    const router = useRouter();
    const [imgUrl, setImgUrl] = useState("")
    const [courseFormValues, setCourseFormValues] = useState({
        courseID: "",
        title: ""
    })

    const uploadImage = async (e: any) => {
        const files = e.target.files;
        setImgUrl(files[0])
    }

    const onSubmit = async () => {
        const imgData = new FormData();
        let pic;
        if (imgUrl) {

            imgData.append('file', imgUrl)
            imgData.append('upload_preset', 'lmscs571')
            const res = await fetch(`https://api.cloudinary.com/v1_1/dp0a8ujno/image/upload`, {
                method: 'POST',
                body: imgData
            })
            const file = await res.json();
            pic = file.secure_url;
        }
        console.log(courseFormValues)
        await createCourse({ ...courseFormValues, img: pic }).then((course) => {
            console.log(`${course.courseTitle} course created`)
            alert("Course created!")
        });
    };
    return (
        <div className="flex flex-col">
            <p className="font-chill text-white text-2xl">Add a course</p>
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-3  items-end ">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-chill">Course ID:</label>
                        <input onChange={(e) => { setCourseFormValues({ ...courseFormValues, courseID: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[70px] font-chill text-dark" placeholder="ID" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-chill">Course Name:</label>
                        <input onChange={(e) => { setCourseFormValues({ ...courseFormValues, title: e.target.value }) }} className="outline-none bg-secondary rounded-md px-3 py-2 w-[250px] font-chill text-dark" placeholder="Database Management Systems" type="text" />
                    </div>
                    <input className="text-white" type="file" name="picture" placeholder="Upload Course " onChange={uploadImage} />
                </div>
                <div onClick={() => onSubmit()} className=" bg-blood font-funky px-8 py-1 text-white text-xl rounded-md w-fit hover:bg-secondary transition-all duration-300 ease-in-out cursor-pointer">Add</div>
            </div>
        </div>
    )
}

export default AddCourseForm