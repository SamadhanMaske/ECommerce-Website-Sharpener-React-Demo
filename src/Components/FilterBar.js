import React from 'react'
import styles from '../Styles/Home.module.css'

function FilterBar(props) {

    const {price, setPrice, setCategory} = props;
    

    return (
        <div className={styles.filterBar}>
            <h1>FilterBar</h1>

            <div className={styles.priceRange}>
                <span>Price </span>{`<= ${price}`}
                <input type="range" min={"100"} max={"50000"} value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>

            <div className={styles.categoryBox}>
                <span>Category </span>
                <div>
                    <input type='radio' id='men' value="men" name='category' onClick={(e)=>setCategory("men")} />
                    <label for="men">Men</label>

                    <input type='radio' id='women' value="women" name='category' onClick={(e)=>setCategory("women")} />
                    <label for="women">Women</label>

                    <input type='radio' id='electric' value="electric" name='category' onClick={(e)=>setCategory("electric")} />
                    <label for="electric">Electric</label>

                    <input type='radio' id='jewellery' value="jewellery" name='category' onClick={(e)=>setCategory("jewellery")} />
                    <label for="jewellery">Jewellery</label>

                    <input type='radio' id='none' value="none" name='category' onClick={(e)=>setCategory("none")} />
                    <label for="none">None</label>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
