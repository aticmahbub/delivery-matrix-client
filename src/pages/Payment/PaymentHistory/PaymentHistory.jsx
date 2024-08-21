
import { useContext } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useWindowSize } from "@uidotdev/usehooks";

import Confetti from 'react-confetti'
const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { width, height } = useWindowSize()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle heading="Congratulations"></SectionTitle>
            <h2 className="text-green-500 text-xl">Your payment is success</h2>
            <Confetti
      width={width}
      height={height}
    />
            <h2 className="text-xl">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item, idx) =>

                        <tr key={item._id}>
                            <th>{idx+1}</th>
                            <td>{item.price}</td>
                            <td>{item.transactionId}</td>
                            <td>{item.status}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;