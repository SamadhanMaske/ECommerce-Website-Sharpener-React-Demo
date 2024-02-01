import React, { useContext } from 'react'
import styles from '../Styles/Home.module.css'
import { ProductContext } from './Store/ProductContext';

function ItemCard(props) {
  const {name, image, price, category} = props.item;
  const {addToCart} = useContext(ProductContext);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img src={image} alt={category}/>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.namePrice}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}> Rs. {price} </div>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.addBtn} onClick={()=>addToCart(props.item)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
