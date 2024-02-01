import React, { Fragment, useContext } from 'react'
import styles from '../Styles/Cart.module.css'
import { AiFillMinusCircle } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";

import { ProductContext } from './Store/ProductContext';

function CartItem(props) {

  const { name, price, quantity, image, category } = props.product;
  const { removeFromCart, increaseQuant, decreaseQuant } = useContext(ProductContext);

  return (
    <Fragment>
      <div className={styles.cardContainer} >
        <div className={styles.imageContainer}><img src={image} alt={category} /> </div>
        <div className={styles.itemInfo} >
          <div className={styles.namePrice}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>Rs. {price}</div>
          </div>
          <div className={styles.quantity}>
            <span className={styles.minus}>
              <AiFillMinusCircle onClick={() => decreaseQuant(props.product)} />
            </span>
            &nbsp; {quantity} &nbsp;
            <span className={styles.plus}>
              <FaCirclePlus onClick={() => increaseQuant(props.product)} />
            </span>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.removeBtn} onClick={() => removeFromCart(props.product)}>Remove from cart</button>
          </div>
        </div>
      </div>
      
    </Fragment>
  )
}

export default CartItem
