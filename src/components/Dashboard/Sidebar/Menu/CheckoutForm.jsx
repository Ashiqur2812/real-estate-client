import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ offer }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const { clientSecret, setClientSecret } = useState('');
    const [transactionID, setTransactionID] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (offer?.offerAmount) {
            axiosSecure.post('/create-payment-intent', { price: offer?.offerAmount })
                .then(({ data }) => {
                    setClientSecret(data.clientSecret);
                })
                .catch(error => console.error(error));
        }
    }, [offer]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) return console.log('confirm error');
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent === 'succeeded') return console.log('transaction id', paymentIntent.id);
            setTransactionID(paymentIntent.id);

            const payment = {
                email: offer?.buyerEmail,
                price: offer?.offerAmount,
                offerId:offer?._id,
                propertyItemId:offer?.propertyId,
                transactionID: paymentIntent.id,
                date: new Date(),
                status:'bought'
            };

            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Payment has been added successfully`,
                });
            }
            // navigate('/dashboard/paymentHistory');
        }
    };

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
            <button type='submit' disabled={!stripe || !clientSecret}
                className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group my-8 cursor-pointer"
            >
                <span
                    className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"
                ></span>
                <span className="absolute bottom-0 left-0 h-full -ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-auto h-full opacity-100 object-stretch"
                        viewBox="0 0 487 487"
                    >
                        <path
                            fill-opacity=".1"
                            fill-rule="nonzero"
                            fill="#FFF"
                            d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
                        ></path>
                    </svg>
                </span>
                <span className="absolute top-0 right-0 w-12 h-full -mr-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="object-cover w-full h-full"
                        viewBox="0 0 487 487"
                    >
                        <path
                            fill-opacity=".1"
                            fill-rule="nonzero"
                            fill="#FFF"
                            d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
                        ></path>
                    </svg>
                </span>
                <span
                    className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
                ></span>
                <span className="relative text-base font-semibold">Pay Now</span>
            </button>
            <p className='text-rose-500 font-bold'>{error}</p>
            {transactionID && <p className='text-rose-500 font-bold'><span className='text-teal-500 font-bold'>Transaction ID :</span> {transactionID}</p>}
        </form>
    );
};

export default CheckoutForm;