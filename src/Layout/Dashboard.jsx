import useRole from "@/components/hooks/useRole";
import { NavLink, Outlet } from "react-router-dom";
import ChartApex from "../pages/ChartApex/ChartApex";
import NavBar from "../pages/Shared/NavBar/NavBar";
const Dashboard = () => {
    const [role] = useRole()
    return (
        <div className="">
            <NavBar />

            <div className="flex">
            <div className="min-w-64 min-h-screen bg-new-white">
                <ul className="menu">
                    <li><NavLink to='/'>Home</NavLink></li>
                    {/* Users menu */}
                    {role === 'user' && <>
                        <h2 className="text xl">Users Dashboard</h2>
                        <ul>
                            <li><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                            <li><NavLink to='/dashboard/myParcels'>My Parcels</NavLink></li>
                            <li><NavLink to='/dashboard/bookParcel'>Book a Parcel</NavLink></li>
                            <li><NavLink to='/dashboard/Maps'>Map</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'>Payment History</NavLink></li>
                        </ul>
                    </>

                    }


                    {/* Delivery Man's menu */}
                    {
                        role === 'deliveryMan' &&
                        <>
                            <h2 className="text xl">Delivery Mans Dashboard</h2>
                            <ul>
                                <li><NavLink to='/dashboard/myDeliveryList'>My Delivery List</NavLink></li>
                                <li><NavLink to='/dashboard/myReviews'>My Reviews</NavLink></li>
                            </ul>
                        </>
                    }


                    {
                        role === 'admin' && <>
                            {/* Admin's menu */}
                            <h2 className="text xl">Admin panel</h2>
                            <li><NavLink to='/dashboard/allParcels'>All Parcels</NavLink></li>
                            <li><NavLink to='/dashboard/allUsers'>All Users</NavLink></li>
                            <li><NavLink to='/dashboard/allDeliveryMen'>All Delivery Men</NavLink></li>
                            <ChartApex></ChartApex>

                        </>
                    }


                </ul>
            </div>
            <Outlet></Outlet>
            </div>


        </div>
    );
};

export default Dashboard;