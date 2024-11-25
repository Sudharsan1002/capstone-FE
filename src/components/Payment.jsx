import React, { useEffect, useRef } from 'react'
import { useApi } from '../contexts/Apicontext'

const Payment = ({ amount, onSuccess }) => {
    const{post}=useApi()
    const paypalRef = useRef()

    useEffect(() => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return 
              }
          })
      }
    }, [third])
    

    return (
    <div>Payment</div>
  )
}

export default Payment