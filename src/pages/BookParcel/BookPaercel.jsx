import SectionTitle from '@/components/SectionTitle/SectionTitle';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import useRole from '@/components/hooks/useRole';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';


const BookPaercel = () => {
    const [role]= useRole()
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        if (user && user?.email) {

            const cPrice = data.price
            const cost = cPrice * 50

            const date = new Date()


            //send data
            const bookedParcel = {
                name: user.displayName,
                email: user.email,
                parcelType: data.parcelType,
                parcelWeight: data.parcelWeight,
                phoneMobile: data.number,
                receiverName: data.receiverName,
                receiverNumber: data.receiverNumber,
                parcelDeliveryAddress: data.parcelDeliveryAddress,
                requestedDeliveryDate: data.requestedDeliveryDate,
                latitude: data.latitude,
                longitude: data.longitude,
                price: cost,
                bookingDate: date,
                status: "pending",
                role: role


            }

            console.log(bookedParcel);
            axiosSecure.post('/book-parcel', bookedParcel)
                .then(res => {
                    console.log(res.data)
                    console.log(date)
                    toast({
                        title: "Success!",
                        description: "You have successfully booked the parcel",
                    })
                    navigate('/dashboard/myParcels')
                })
        }
        else {
            toast({
                variant: "destructive",
                title: "Booking failed",
                description: "Please login to your account for booking a parcel"

            })

        }
    }
    return (
        <div>
            <SectionTitle heading="Book a Parcel"></SectionTitle>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" className="input input-bordered" required defaultValue={user?.displayName} {...register("name")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required defaultValue={user?.email} {...register("email")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" placeholder="number" className="input input-bordered" required defaultValue={user?.email} {...register("number")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input type="text" placeholder="parcel" className="input input-bordered" required {...register("parcelType")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Weight</span>
                        </label>
                        <input type="number" placeholder="weight" className="input input-bordered" required {...register("parcelWeight")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver Name</span>
                        </label>
                        <input type="text" placeholder="receiver" className="input input-bordered" required {...register("receiverName")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver Phone Number</span>
                        </label>
                        <input type="number" placeholder="receiver-number" className="input input-bordered" required {...register("receiverNumber")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Delivery Address</span>
                        </label>
                        <input type="text" placeholder="parcel-address" className="input input-bordered" required {...register("parcelDeliveryAddress")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input type="date" placeholder="date" className="input input-bordered" required {...register("requestedDeliveryDate")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input type="text" placeholder="latitude" className="input input-bordered" required {...register("latitude")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address longitude</span>
                        </label>
                        <input type="text" placeholder="longitude" className="input input-bordered" required {...register("longitude")} />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" placeholder="price" className="input input-bordered" required {...register("price")} />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Book</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookPaercel;