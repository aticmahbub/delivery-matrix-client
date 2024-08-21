
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useReviewsLoader = () => {
    const axiosSecure = useAxiosSecure()
    const {refetch, data: reviews= [],isLoading} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users/reviews')
            console.log(res.data);
            return res.data

        }
    })
return [reviews, isLoading, refetch]
};

export default useReviewsLoader;