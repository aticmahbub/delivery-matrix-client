import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Circles } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
// import { Circles } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return   <>
            <div className="">
            <Circles
                height="120"
                width="120"
                color="#C0C2C9"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            </div>
        </>
    }


    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;