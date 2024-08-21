import SectionTitle from "@/components/SectionTitle/SectionTitle";
// import useParcelLoader from "@/components/hooks/useParcelLoader";
// import useReviewsLoader from "../../components/hooks/useReviewsLoader";
import useUsersLoader from "../../components/hooks/useUsersLoader/useUsersLoader";


const AllDeliveryMen = () => {
    const [users] = useUsersLoader()
    // const [parcels] = useParcelLoader()
    // const [reviews] = useReviewsLoader()
    // // console.log(reviews,'reviews');
    const deliveryManF = users.filter(item => item?.role === 'deliveryMan')
    // console.log(deliveryManF,'target');
    // console.log(users,'users');

    // const reviewsLoad = reviews.filter(reviews._id)

    return (
        <div>
            <SectionTitle heading="All Delivery Men"></SectionTitle>
            {/* <h2>Delivery Men: {deliveryMan.length}</h2> */}
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Delivery Mans Name</th>
                        <th>Phone Number</th>
                        <th>Number of parcel delivered</th>
                        <th>Average review</th>



                    </tr>
                </thead>
                <tbody>
                    {
                    deliveryManF.map((item, idx) =>
                        <tr key={item._id}>
                            <td>{idx + 1}</td>
                            <td>{item?.name}</td>
                            <td>Not provided</td>
                            <td>{item?.revRating}</td>
                            <td>Amount</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMen;