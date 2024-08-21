import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useParcelLoader = () => {
    const axiosSecure = useAxiosSecure()
    const {refetch, data: parcels= [],isLoading} = useQuery({
        queryKey: ['parcels'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/all-parcels')
            return res.data

        }
    })
    return [parcels, isLoading, refetch]
};

export default useParcelLoader;