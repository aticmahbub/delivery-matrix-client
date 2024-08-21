
import useRole from '../components/hooks/useRole';
import { FaSpinner } from 'react-icons/fa6';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({children}) => {
    const [role, isLoading] =useRole();

    if(isLoading) return <FaSpinner></FaSpinner>
    if(role === 'admin') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default AdminRoutes;