import React, { useState } from 'react'
import styles from '../Styles/navbar.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { SiShopee } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { FaShopify } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useAuthValue } from '../AuthContext';

function Navbar() {

    // const [isLoggedIn, signOut] = useAuthValue();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <div className={styles.navbarContainer}>
                <div className={styles.appName}>
                    <NavLink to={"/"}>
                        <span>
                            <SiShopee />
                            AppName
                        </span>
                    </NavLink>
                </div>

                <div className={styles.navLinks}>
                    <NavLink to={"/"}>
                        <span>
                            <FaHome />
                            Home
                        </span>
                    </NavLink>
                    {isLoggedIn && <NavLink to={"/myorders"}>
                        <span>
                            <FaShopify />
                            My Orders
                        </span>
                    </NavLink>}
                    {isLoggedIn && <NavLink to={"/cart"}>
                        <span>
                            <FaCartPlus />
                            Cart
                        </span>
                    </NavLink>}
                    <NavLink to={!isLoggedIn ? "/signin" : "/"}>
                        <span>
                            {
                                !isLoggedIn ? <>
                                    <MdLogin />
                                    SignIn
                                </> :
                                    <>
                                        <MdLogin />
                                        <span>Signout</span>
                                    </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default Navbar
