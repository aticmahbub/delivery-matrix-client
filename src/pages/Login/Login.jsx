import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { useForm } from "react-hook-form"
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { toast } from '@/components/ui/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '@/components/SocialLogin/SocialLogin';



const Login = () => {
    const { signIn, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'
    console.log(user);
    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {

        console.log(data);
        
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user);
                toast({
                    title: (
                        <div className='flex gap-2 items-center text-green-700 text-xl'>
                            <IoCheckmarkDoneCircle />
                            <h2 className="">{user?.displayName ? user?.displayName :'User'} logged in successfully</h2>
                        </div>
                    )
                })
                navigate(from, {replace:true})
            })
            .catch(error =>{
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
            <SectionTitle heading="Login"></SectionTitle>

            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Welcome Back to DeliverMatrix</h1>
                        <p className="py-6">Log in to your account to manage your parcels, track deliveries, and access all our features.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;