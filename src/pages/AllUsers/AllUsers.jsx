import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
// import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import useParcelLoader from "@/components/hooks/useParcelLoader";
import useUsersLoader from "@/components/hooks/useUsersLoader/useUsersLoader";
import { Button } from "@/components/ui/button";
// import useUsersLoader from "@/components/hooks/useUsersLoader/useUsersLoader";
// import { Button } from "@/components/ui/button";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [parcels] = useParcelLoader()
    const [users, refetch] = useUsersLoader()

    // const usersF = users.filter(f => f.role==='user')
    const handleMakeAdmin = (users) => {
        axiosSecure.patch(`/users/admin/${users._id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
        console.log('clicked', users._id);
    }


    const handleMakeDeliveryMan = (users) => {
        axiosSecure.patch(`/users/makeDeliveryMan/${users._id}`)
            .then(res => {
                console.log(res)
                refetch()
            })

    }
    return (
        <div>
            <SectionTitle heading="All Users"></SectionTitle>
            <h2>Users:{parcels.length}</h2>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User name</th>
                        <th>Phone Number</th>
                        <th>Number of booked parcels</th>
                        <th>Total Spent</th>
                        <th>Make Delivery Man</th>
                        <th>Make Admin</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        users
                            .map((item, idx) =>
                                <tr key={item._id}>

                                    <td>{idx + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phoneMobile}</td>
                                    <td>{item.length}</td>
                                    <td>{item.role}</td>
                                    <td><Button onClick={() => handleMakeDeliveryMan(item)}>Make Delivery Man</Button></td>
                                    <td><Button onClick={() => handleMakeAdmin(item)}>Make Admin</Button></td>
                                </tr>)
                    }
                </tbody>
            </table>
            <div className="join">
                <button className="join-item btn">1</button>
                <button className="join-item btn">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">4</button>
            </div>
        </div>
    );
};

export default AllUsers;