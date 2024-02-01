import React from 'react'
import styles from '../Styles/Order.module.css'

function OrderDetails(props) {

    const {date, list, amount} = props.order;


    return (
        <div>
            <h1 className={styles.orderHeading}> Ordered On: {date} </h1>
            <table>
                <tr>
                    <th>Sr No</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
                {
                    list.map((product,i)=>{
                        return <tr>
                            <td>{i+1}</td>
                            <td> {product.name} </td>
                            <td> {product.price} </td>
                            <td> {product.quantity} </td>
                            <td> Rs. {product.quantity*product.price} </td>
                        </tr>
                    })
                }
                <tr>
                    <td colSpan={4}>Grand Total : </td>
                    <td>Rs. {amount}</td>
                </tr>
            </table>
        </div>
    )
}

export default OrderDetails
