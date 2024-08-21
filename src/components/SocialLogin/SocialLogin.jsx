
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })
            })
    }
    return (
            <button onClick={handleGoogleLogin} className='btn btn-wide' >
                <FaGoogle></FaGoogle> Login
            </button>
       
    );
};

export default SocialLogin;