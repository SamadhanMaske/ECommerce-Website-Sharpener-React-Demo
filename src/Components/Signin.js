import React, { useContext, useRef } from 'react'
import styles from '../Styles/Signin.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './Store/AuthContext';

function Signin() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    
    const {signIn} = useContext(AuthContext);

    async function handleSignin(e){
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log("From Signin.js data: ", data);
        const status = await signIn(data);
        {status?navigate("/"):navigate("/signin")}
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputForm}>
                <h1>SignIn</h1>
                <form action='' onSubmit={handleSignin}>
                    <input type='email' placeholder='enter email...' required ref={emailRef}/>
                    <input type='password' placeholder='enter passward' required ref={passwordRef}/>
                    <button type='submit'>SignIn</button>
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
