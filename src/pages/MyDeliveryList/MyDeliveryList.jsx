import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useParcelLoader from "@/components/hooks/useParcelLoader";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyDeliveryList = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure =useAxiosSecure()
    const [parcels, ,refetch] = useParcelLoader()
    const deliveryList = parcels.filter(item => item?.assignedDeliveryManEmail === user?.email)

    const handleCancelDelivery = id => {
        Swal.fire({
            title: "Are you want to cancel this parcel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/cancel/${id}`)
                    .then(res => {
                        console.log(res)
                        refetch()
                        
                    })
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your parcel has been cancelled.",
                    icon: "success"
                });

            }
        });

    }

    const handleDeliver = id => {
        Swal.fire({
            title: "Are you want to cancel this parcel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/deliver/${id}`)
                    .then(res => {
                        console.log(res)
                        refetch()
                        
                    })
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your parcel has been cancelled.",
                    icon: "success"
                });

            }
        });

    }

    return (
        <div className="w-[1200px]">
            <SectionTitle heading='My Delivery List'></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Booked User’s Name</th>
                            <th>Receivers Name</th>
                            <th>Booked User’s Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Recievers phone number</th>
                            <th>Recievers Address</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Cancel</th>
                            <th>Deliver</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                        {
                            deliveryList.map((item, idx) =>
                    <tr key={item._id}>
                        <th>{idx+1}</th>
                        <td>{item?.name}</td>
                        <td>{item?.receiverName}</td>
                        <td>{item?.phoneMobile}</td>
                        <td>{item?.requestedDeliveryDate}</td>
                        <td>{item?.approximateDeliveryDate}</td>
                        <td>{item?.receiverNumber}</td>
                        <td>{item?.parcelDeliveryAddress}</td>
                        <td>{item?.status}</td>
                        <td><Button className='btn btn-outline text-black'>View</Button></td>
                        <td><Button onClick={() => handleCancelDelivery(item._id)} className='btn btn-outline text-black'>Cancel</Button></td>
                        <td><Button onClick={() => handleDeliver(item._id)} className='btn btn-outline text-black'>Deliver</Button></td>

                            
                    </tr>
                         )   
                            }
                </tbody>
            </table>
        </div>

        </div >
    );
};

export default MyDeliveryList;


