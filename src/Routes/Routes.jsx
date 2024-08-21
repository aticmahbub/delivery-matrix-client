import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "@/pages/Login/Login";
import Registration from "@/pages/Registration/Registration";

import BookPaercel from "@/pages/BookParcel/BookPaercel";
import MyParcels from "@/pages/MyParcels/MyParcels";
import Dashboard from "@/Layout/Dashboard";
import MyProfile from "@/pages/MyProfile/MyProfile";
import AllParcels from "@/pages/AllParcels/AllParcels";
import AllUsers from "@/pages/AllUsers/AllUsers";
import AllDeliveryMen from "@/pages/AllDeliveryMen/AllDeliveryMen";
import UpdateBooking from "@/pages/UpdateBooking/UpdateBooking";
import AddReview from "@/pages/AddReview/AddReview";
import PrivateRoute from "./PrivateRoute";
import MyDeliveryList from "@/pages/MyDeliveryList/MyDeliveryList";
import MyReviews from "@/pages/MyReviews/MyReviews";
import AdminRoutes from "./AdminRoutes";
import Payment from "../pages/Payment/Payment";
import PaymentHistory from "../pages/Payment/PaymentHistory/PaymentHistory";
import ChartApex from "../pages/ChartApex/ChartApex";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'registration',
            element: <Registration></Registration>
        },
        
      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            //users menu
            {
                path: 'bookParcel',
                element: <PrivateRoute><BookPaercel></BookPaercel></PrivateRoute>
            },
            {
                path: 'myParcels',
                element: <PrivateRoute><MyParcels></MyParcels></PrivateRoute>
            },
            {
                path: 'myProfile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'allParcels',
                element: <PrivateRoute><AllParcels></AllParcels></PrivateRoute>
            },
            {
                path: 'payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'paymentHistory',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            //admin menu
            {
                path: 'allUsers',
                element: <AdminRoutes><PrivateRoute><AllUsers></AllUsers></PrivateRoute></AdminRoutes>
            },
            {
                path: 'allDeliveryMen',
                element: <PrivateRoute><AllDeliveryMen></AllDeliveryMen></PrivateRoute>
            },

            {
                path: 'charts',
                element: <PrivateRoute><ChartApex></ChartApex></PrivateRoute>
            },

            
            {
                path: 'updateBooking/:id',
                element: <PrivateRoute><UpdateBooking></UpdateBooking></PrivateRoute>
            },
            {
                path: 'myDeliveryList',
                element: <PrivateRoute><MyDeliveryList></MyDeliveryList></PrivateRoute>
            },
            {
                path: 'addReview/:id',
                element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
            },
            {
                path: 'myReviews',
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            },
            
        ]
    },
  ]);