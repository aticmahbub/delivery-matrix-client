import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useRole from "@/components/hooks/useRole";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from '@/components/ui/use-toast';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const MyProfile = () => {
    const [role] = useRole()
    const { user, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleImageUpload = async (e) => {
        e.preventDefault()
        const name = user.displayName
        const form = e.target
        const image = form.image.files[0]
        console.log(image);
        const formData = new FormData()
        formData.append('image', image)
        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )
            console.log(name, data.data.display_url);
            console.log(data.data.display_url, updateUserProfile)
            await updateUserProfile(name, data.data.display_url)
            toast({
                title: (
                    <div className='flex gap-2 items-center text-green-700 text-xl'>
                        <h2 className="text-3xl"><IoCheckmarkDoneCircle /></h2>
                        <h2 className="">Images uploaded successfully </h2>
                    </div>
                )
            })
            navigate(0)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <SectionTitle heading="My Profile"></SectionTitle>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={user?.photoURL} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p className="text-blue-500">Role: {role}</p>
                    <div className="card-actions justify-end">
                        <form className="my-4" onSubmit={handleImageUpload}>
                            <input required type="file" id="image" name="image" accept="image/*" />
                            <Button className='btn btn-secondary'>Upload</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
// <div className="card lg:card-side bg-base-100 shadow-xl">
//     <figure><img src={user?.photoURL} /></figure>
//     <div className="card-body">
//         <h2 className="card-title">{user?.displayName}</h2>
//         <p>Total number of booked parcels: {usersSpecificParcel.length}</p>
//         <p>Role: {role}</p>
//         <div className="card-actions justify-end">
//             <form onSubmit={handleImageUpload}>
//                 <input required type="file" id="image"  name="image" accept="image/*"/>
//                 <Button>Upload</Button>
//             </form>
//             <button className="btn btn-primary">Edit Profile</button>
//         </div>
//     </div>
// </div>