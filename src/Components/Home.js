import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import styles from '../Styles/Home.module.css'
import FilterBar from './FilterBar';
import MainContent from './MainContent';

function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [applyFilter, setApplyFilter] = useState(true);
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState("none");
    const [search, setSearch] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    return (
        <div>
            {
                isLoading ? <Loader /> :
                    <>
                        <div className={styles.header}>
                            <input type='text' placeholder='Search Item' value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button onClick={() => setApplyFilter(!applyFilter)}>
                                {applyFilter ? "Cancel" : "Apply Filter"}
                            </button>
                        </div>

                        <div className={styles.mainContainer}>
                            {applyFilter && <FilterBar price={price} setPrice={setPrice} setCategory={setCategory} />}
                        </div>

                        <MainContent search={search} price={price} category={category} applyFilter={applyFilter} />
                    </>
            }
        </div>
    )
}

export default Home
