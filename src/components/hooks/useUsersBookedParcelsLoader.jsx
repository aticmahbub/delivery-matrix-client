import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';


const useUsersBookedParcelsLoader = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const {refetch, data: usersSpecificParcel=[]} =useQuery({
        queryKey: ['usersSpecificParcel', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/parcel-collection?email=${user.email}`)
            return res.data
        }
    })
    return  [usersSpecificParcel, refetch]
};

export default useUsersBookedParcelsLoader;