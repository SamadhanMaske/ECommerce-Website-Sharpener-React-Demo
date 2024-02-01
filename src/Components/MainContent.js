import React, { useContext } from 'react'
import styles from '../Styles/Home.module.css'
import ItemCard from './ItemCard';
import { ProductContext } from './Store/ProductContext';

function MainContent(props) {

    const { search, price, category, applyFilter } = props;
    const { data } = useContext(ProductContext);

    return (
        <div className={styles.itemContainer}>
            {
                data.filter((item) => {
                    return search.toLocaleLowerCase() === '' ? item : item.name.toLocaleLowerCase().includes(search)
                }).filter((item) => {
                    return !applyFilter ? item : item.price<=price
                }).filter((item)=>{
                    return !applyFilter || category==="none" ? item : item.category===category
                }).map((item)=>{
                    return <ItemCard key={item.id} item={item} />
                })
            }
        </div>
    )
}

export default MainContent
