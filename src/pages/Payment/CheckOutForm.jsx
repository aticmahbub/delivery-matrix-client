import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import useUsersBookedParcelsLoader from "@/components/hooks/useUsersBookedParcelsLoader";
import { AuthContext } from "@/providers/AuthProvider";

const CheckOutForm = () => {
    const {user} =useContext(AuthContext)
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] =useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [usersSpecificParcel] = useUsersBookedParcelsLoader()
    const totalPrice = usersSpecificParcel.reduce((total, item) => total+ item.price, 0)
    console.log('reduce', totalPrice);
    useEffect(()=>{
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res =>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
        }
    } ,[axiosSecure, totalPrice])




    const handleSubmit = async(event) => {
        event.preventDefault()
        if(!stripe || !elements){
            return
        } 

        const card = elements.getElement(CardElement)

        if(card === null){
            return 
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment error:',error);
            setError(error.message)
        }
        else{
            console.log('payment method', paymentMethod);
            setError('')
        }

        //confirm payment
        const {paymentIntent, error: confirmError} = await stripe.
        confirmCardPayment(clientSecret,{
            payment_method:{
                card: card,
                billing_details:{
                    email: user.email,
                    name: user.displayName,

                }
            }
        })
        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('paymentIntent', paymentIntent);
            if(paymentIntent.status==='succeeded'){
                setTransactionId(paymentIntent.id)

                const payment = {
                    email:user.email,
                    price: totalPrice,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    parcelId: usersSpecificParcel.find(item => item._id),
                    deliveryManId: usersSpecificParcel.find(item => item._id),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log('payment saved',res);

            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            <p className="text-green-500">Your transaction Id:{transactionId}</p>
        </form>
    );
};

export default CheckOutForm;