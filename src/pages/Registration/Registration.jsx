import SectionTitle from '@/components/SectionTitle/SectionTitle';
import SocialLogin from '@/components/SocialLogin/SocialLogin';
import useAxiosPublic from '@/components/hooks/useAxiosPublic';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { useForm } from "react-hook-form"
import { ImCross } from 'react-icons/im';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    const { createUser, updateUserProfile, } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        reset

    } = useForm()



    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {

                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            role: data.role
                        }

                        console.log('user profile updated');
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    toast({
                                        title: (
                                            <div className='flex gap-2 items-center text-green-700 text-xl'>
                                                <h2 className="text-3xl"><IoCheckmarkDoneCircle /></h2>
                                                <h2 className=""><span className='text-black'>{data?.name}</span> has successfully created an account </h2>
                                            </div>
                                        )
                                    })
                                }
                            })

                    })
                    .catch(error => console.log(error))
                toast({
                    title: (
                        <div className='flex gap-2 items-center text-green-700 text-xl'>
                            <h2 className="text-3xl"><IoCheckmarkDoneCircle /></h2>
                            <h2 className=""><span className='text-black'>{data?.name}</span> has successfully created an account</h2>
                        </div>
                    )
                })
                navigate(from, {replace:true})
            })
            .catch(error => {
                toast({
                    title: (
                        <div className='flex gap-2 items-center text-red-700 text-xl'>
                            <ImCross />

                            <h2 className="">{error.message}</h2>
                        </div>
                    )
                })
            })
    }

    return (
        <div>
            <SectionTitle heading="Registration"></SectionTitle>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Join DeliverMatrix</h1>
                        <p className="py-6">Create an account to start managing your deliveries with ease. Sign up now to access all our advanced parcel management features.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" required {...register("name")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="text" placeholder="URL" className="input input-bordered" required {...register("photoURL")} />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />
                                <label className="label">
                                </label>
                            </div>
                            <div>
                                <label htmlFor="Hi">
                                    Select your role:
                                    <br />
                                    <select
                                        defaultValue={'user'}
                                        {...register("role")}>
                                        <option value="user">User</option>
                                        <option value="deliveryMan">Delivery Man</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div className='mx-auto mb-4'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;