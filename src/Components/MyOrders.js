import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './Store/ProductContext';
import styles from '../Styles/Order.module.css'
import Loader from './Loader';
import { Link } from 'react-router-dom';
import OrderDetails from './OrderDetails';

function MyOrders() {

    const [isLoading, setIsLoading] = useState(true);
    const {myorders} = useContext(ProductContext);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        },400);
    })

    return (
        <div>
            {
                isLoading ? <Loader/> : 
                    <div className={styles.mainContainer}>
                        <h1 className={styles.orderHeading}> My Orders </h1>
                        {
                            myorders.length===0 ? 
                            <>
                                <h1>You haven't placed any order yet</h1>
                                <Link to={"/"}>Start Shopping</Link>
                            </> 
                            :
                            <div className={styles.orderListContainer}>
                                { myorders.map((order,i)=><OrderDetails key={i} order={order}/>) }
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default MyOrders
