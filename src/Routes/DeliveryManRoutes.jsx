
import useRole from '../components/hooks/useRole';
import { FaSpinner } from 'react-icons/fa6';
import { Navigate } from 'react-router-dom';

const DeliveryManRoutes = ({children}) => {
    const [role, isLoading] =useRole();

    if(isLoading) return <FaSpinner></FaSpinner>
    if(role === 'deliveryMan') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default DeliveryManRoutes;