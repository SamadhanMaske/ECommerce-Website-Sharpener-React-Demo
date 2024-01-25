import React, { useContext, useRef } from 'react'
import styles from '../Styles/Signin.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './Store/AuthContext';

function Signup() {

    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const navigate = useNavigate();
    const {createUser} = useContext(AuthContext);

    async function handleSignup(e){
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        createUser(data);
        navigate("/signin");
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputForm}>
                <h1>SignUp</h1>
                <form action='' onSubmit={handleSignup}>
                    <input type='text' placeholder='enter name...' required ref={nameRef} />
                    <input type='email' placeholder='enter email...' required ref={emailRef} />
                    <input type='password' placeholder='enter password' required ref={passwordRef} />
                    <button type='submit'>SignUp</button>
                </form>
                <br />
                <span>
                    or &nbsp;
                    <NavLink to={"/signin"}>SignIn Here</NavLink>
                </span>
            </div>
        </div>
    )
}

export default Signup
