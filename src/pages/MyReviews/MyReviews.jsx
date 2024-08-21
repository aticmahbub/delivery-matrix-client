import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";


const MyReviews = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { data: specificReview = [] } = useQuery({
        queryKey: ['specificReview', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`reviews?email=${user.email}`)
            return res.data
        }
    })

    console.log(specificReview);
    return (
        <div className="">
            <SectionTitle heading='My Reviews'></SectionTitle>
            <h2>Total reviews: {specificReview.length}</h2>
            <div className="grid grid-cols-2 gap-4">
            {
                specificReview.map(item=>
                    <div  key={item._id} className=" card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src={item?.revPhotoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{item?.revUserName}</h2>
                    <p>Rating: {item?.revRating} out of 5</p>
                    <p>Date: {item?.date}</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
                )
                }
            </div>
        </div>
    );
};

export default MyReviews;