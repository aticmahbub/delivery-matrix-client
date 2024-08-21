import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import useUsersBookedParcelsLoader from "@/components/hooks/useUsersBookedParcelsLoader";
import useUsersLoader from "@/components/hooks/useUsersLoader/useUsersLoader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AuthContext } from "@/providers/AuthProvider";
// import { toast } from "@/components/ui/use-toast";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcels = () => {
    const axiosSecure = useAxiosSecure()
    const [parcelId, setParcelId] = useState()
    const { user } = useContext(AuthContext)
    const [users] = useUsersLoader()
    const [usersSpecificParcel, refetch] = useUsersBookedParcelsLoader()
    const totalPrice = usersSpecificParcel.reduce((total, item) => total+ item.price, 0)
    console.log('reduce', totalPrice);
    const userMatched = users.find(item => item?._id == parcelId)

    console.log('parcelid', parcelId);
    console.log('result', userMatched);
    console.log('usersSpecificParcel', usersSpecificParcel);



    const handleCancelParcel = id => {
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
                axiosSecure.patch(`/users/usersStatus/${id}`)
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


    const handleManageParcels = id => {
        setParcelId(id)
    }

    const handleModalData = e => {
        e.preventDefault()
        const form = e.target
        const revUserName = form.revUserName.value
        const revPhotoURL = form.revPhotoURL.value
        const revDeliveryManId = form.revDeliveryManId.value
        const revRating = form.revRating.value
        const revFeedback = form.revFeedback.value
        const email = userMatched.email



        const date = new Date()
        const currentDate =date.toLocaleDateString()
        console.log(currentDate);
        const data = {
            revUserName,
            revPhotoURL,
            revDeliveryManId,
            revRating,
            revFeedback,
            date:currentDate,
            email:email

        }

        console.log(data);
        axiosSecure.post('/users/reviews', data)
            .then(res => {
                console.log(res.data)

                refetch()
                toast({
                    title: "Success!",
                    description: "You have successfully updated the parcel",
                })
            })

    }

    return (
        <div>
            <SectionTitle heading="My Parcels"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Type</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men ID</th>
                            <th>Booking Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Add Review</th>
                            <th>Pay</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersSpecificParcel.map((item, idx) =>
                                <tr key={item._id}>
                                    <td>{idx + 1}</td>
                                    <td>{item?.parcelType}</td>
                                    <td>{item?.requestedDeliveryDate}</td>
                                    <td><Button className="btn" onClick={() => handleManageParcels(item?.assignedDeliveryManId)}><label htmlFor="my_modal_7">Add Review</label></Button></td>

                                    <td>{item?.approximateDeliveryDate ? item?.approximateDeliveryDate : 'Not provided yet'}</td>
                                    <td>{item?.bookingDate}</td>
                                    <td>{item?.assignedDeliveryManId}</td>
                                    <td>{item.status === 'pending' && 'Pending' || item.status === 'on the way' && 'On the Way' || item.status === 'delivered' && 'Delivered' || item.status === 'returned' && 'Returned' || item.status === 'cancelled' && 'Cancelled'}</td>
                                    <td><Button className='btn'><Link to={`/dashboard/updateBooking/${item._id}`}>Update</Link></Button></td>
                                    <td><Button className={`btn ${item.status === 'pending' ? 'btn-warning' : 'btn-disabled'}`} onClick={() => handleCancelParcel(item._id)}>Cancel</Button></td>

                                </tr>)
                        }
                        <td><Link className="btn" to='/dashboard/payment'>Pay</Link></td>
                    </tbody>
                </table>
            </div>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Assign DeliveryMan</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                    <form onSubmit={handleModalData} >
                        <h2 className="text-l font-bold">Give Review</h2>
                        {/* <select name='dMan'>
                            {
                                delivery.map(item =>
                                    <option key={item._id} value={item._id}>{item.name}{item.price} {item._id}</option>
                                )
                            }
                        </select> */}
                        <h2 className="text-l font-bold">User Name:</h2>
                        <input type="text" defaultValue={user?.displayName} className="input input-bordered max-w-xs" name="revUserName" />
                        <h2 className="text-l font-bold">User Image:</h2>
                        <input type="text" defaultValue={user?.photoURL} className="input input-bordered max-w-xs" name="revPhotoURL" />
                        <h2 className="text-l font-bold" >Delivery Man ID:</h2>
                        <input type="text" defaultValue={userMatched?._id} className="input input-bordered max-w-xs" name="revDeliveryManId" />
                        <h2 className="text-l font-bold">Rating</h2>
                        <input type="number" max='5' className="input input-bordered max-w-xs" name="revRating" />
                        <br />
                        <textarea className="textarea textarea-bordered" placeholder="Your Feedback" name="revFeedback"></textarea>

                        <input type="submit" value=" Assign" />
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    );
};

export default MyParcels;