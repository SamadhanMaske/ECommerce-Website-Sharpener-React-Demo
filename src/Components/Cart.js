import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from './Store/ProductContext';
import { AuthContext } from './Store/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Cart.module.css'
import Loader from './Loader';
import CartItem from './CartItem';
import { toast } from 'react-toastify';

function Cart() {
    const [isLoading, setIsLoading] = useState(true);
    const { cart, total, clearCart, purchaseAll, itemInCart } = useContext(ProductContext);
    const { userLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        },[]);
    })

    function handlePurchase(){
        if(itemInCart===0){
            toast.error("Nothing to purchase in your cart")
        }
        purchaseAll();
        toast.success("Your order has been placed");
        navigate("/myorder")
    }

    return (
        <div>
            {
                isLoading ? <Loader/> :
                <div className={styles.mainContainer}>
                    <div className={styles.header}>
                        <div className={styles.userInfo}>
                            <h1>Hey {userLoggedIn.name}, <small>Your cart has </small></h1>
                        </div>
                        <div className={styles.cartDetails}>
                            <div>
                                Item : {itemInCart}
                                <br/>
                                <button onClick={clearCart} className={styles.removeAll}>Remove All</button>
                            </div>
                            <div>
                                Total Amount : Rs. {total}
                                <br/>
                                <button onClick={handlePurchase} className={styles.purchaseAll}>Purchase All</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.itemContainer}>
                        {
                            cart.length===0 ? <h1>Nothing is in your cart</h1> : 
                                cart.map((product, index)=><CartItem product={product} key={index}/>)
                        }
                        
                    </div>
                </div>
            }

        </div>
    )
}

export default Cart
