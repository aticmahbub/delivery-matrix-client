import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { IoMdNotificationsOutline } from "react-icons/io";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)


    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    return (
        <div className="navbar bg-bgbg">
            <div className="flex-1">
                <img className='h-12' src={logo} alt="" />
                <Link to='/' className="text-xl font-bold">Deliver Matrix</Link>
            </div>
            <div className="flex-1">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal flex justify-between gap-4 px-1">
                        <>
                            <NavLink
                                className={({ isActive }) => isActive ? 'font-bold text-accent-new' : 'text-primary-new'}
                                to='/'>Home</NavLink>
                            <NavLink
                                className={({ isActive }) => isActive ? 'font-bold text-accent-new' : 'text-primary-new'}
                                to='/dashboard'>Dashboard</NavLink>
                            {!user ? <>

                                <NavLink
                                    className={({ isActive }) => isActive ? 'font-bold text-accent-new' : 'text-primary-new'}
                                    to='/login'>Login</NavLink>
                                <NavLink
                                    className={({ isActive }) => isActive ? 'font-bold text-accent-new' : 'text-primary-new'}
                                    to='/registration'>Registration</NavLink>
                            </>
                                :
                                <>
                                    <a onClick={handleLogout} >Logout</a>
                                </>

                            }
                        </>
                    </ul>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div className="dropdown">
                        <div tabIndex={1} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>{user?.displayName}</li>
                            <li><NavLink to='dashboard/myProfile'>Profile</NavLink></li>
                            <li><NavLink to='dashboard/statisticsSection'>Dashboard</NavLink></li>
                            <li><a><Button onClick={handleLogout} >Logout</Button></a></li>
                        </ul>
                    </div>


                </div>

                {
                    user &&
                    <div className=" items-center dropdown dropdown-end">
                        <Button><h2 className="text-3xl"><IoMdNotificationsOutline /></h2></Button>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>{user?.displayName}</li>
                            <li><NavLink to='dashboard/myProfile'>Profile</NavLink></li>
                            <li><NavLink to='dashboard/'>Dashboard</NavLink></li>
                            <li><a><Button onClick={handleLogout} >Logout</Button></a></li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    );
};

export default NavBar;