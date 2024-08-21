
// import useParcelLoader from "@/components/hooks/useParcelLoader";

import SectionTitle from '@/components/SectionTitle/SectionTitle';
import useParcelLoader from '@/components/hooks/useParcelLoader';
import { Circles } from 'react-loader-spinner';
import useUsersLoader from '@/components/hooks/useUsersLoader/useUsersLoader';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { toast } from '@/components/ui/use-toast';
const AllParcels = () => {
    const [parcels, isLoading] = useParcelLoader()
    console.log(parcels);
    const [users, refetch] = useUsersLoader()
    const [managedId, setManagedId] = useState()


    const delivery = users.filter(item => item.role === 'deliveryMan')
    console.log(delivery,);

    const axiosSecure = useAxiosSecure()


    const handleManageParcels = id => {
        setManagedId(id)

    }
    if (isLoading)
        return <>
            <div className="">
                <Circles
                    height="120"
                    width="120"
                    color="#C0C2C9"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </>

    const handleModalData = e => {
        e.preventDefault()
        const form = e.target
        const approximateDeliveryDate = form.aprxDeldate.value
        const assignedDeliveryManId = form.dMan.value
        const assignedDeliveryManEmail = delivery.find(item => item._id === assignedDeliveryManId).email
        const assignedDeliveryManPrice = delivery.find(item => item._id === assignedDeliveryManId).price
        console.log(assignedDeliveryManEmail);
        const data = { approximateDeliveryDate, assignedDeliveryManId, assignedDeliveryManEmail, status: 'on the way', managedId, role: 'deliveryMan', assignedDeliveryManPrice }
        // handleManageParcels()
        console.log(data);
        axiosSecure.patch(`/assign-parcel/${managedId}`, data)
            .then(res => {
                console.log(res.data)

                refetch()
                toast({
                    title: "Success!",
                    description: "You have successfully updated the parcel",
                })
            })

    }


    // const assignedData ={
    //     approximateDeliveryDate: date
    // }

    return (
        <div>


            <SectionTitle heading="My Parcels"></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Owner</th>
                            <th>Parcel Owner Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage Parcels</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((item, idx) =>
                                <tr key={item._id}>
                                    <td>{idx + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.phoneMobile}</td>
                                    <td>{item?.bookingDate}</td>
                                    <td>{item?.requestedDeliveryDate}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.status}</td>
                                    <td>

                                        {/* <label htmlFor="my_modal_7" >open modal</label> */}
                                        <Button className="btn" onClick={() => handleManageParcels(item._id)} ><label htmlFor="my_modal_7">Manage</label></Button></td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Assign DeliveryMan</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                    <form onSubmit={handleModalData} >
                        <h2 className="text-l font-bold">Select Delivery Man</h2>
                        <select name='dMan'>
                            {
                                delivery.map(item =>
                                    <option key={item._id} value={item._id}>Id:{item._id} {item.email} </option>
                                )
                            }
                        </select>
                        <h2 className="text-l font-bold">Approximate Delivery Date:</h2>
                        <input className="input input-bordered w-full max-w-xs" type="date" name='aprxDeldate' />
                        <input type="submit" value=" Assign" />
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>

    );
};

export default AllParcels;