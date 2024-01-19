import React, { useRef } from 'react'
import styles from '../Styles/Signin.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthValue } from './../AuthContext';

function Signin() {

    const emailRef = useRef();
    const passwardRef = useRef();

    const navigate = useNavigate();
    // const {signIn} = useAuthValue();

    async function handleSignin(e){
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            passward: passwardRef.current.value
        }

        // const status = await signIn(data);
        // {status?navigate("/"):navigate("/signin")}
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputForm}>
                <h1>SignIn</h1>
                <form action='' onSubmit={handleSignin}>
                    <input type='email' placeholder='enter email...' required ref={emailRef}/>
                    <input type='passward' placeholder='enter passward' required ref={passwardRef}/>
                    <button type='submit'>Signin</button>
                </form>
                <br />
                <span>
                    or &nbsp;
                    <NavLink to={"/signup"}>Create New Account</NavLink>
                </span>
            </div>
        </div>
    )
}

export default Signin
