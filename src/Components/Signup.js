import React, { useRef } from 'react'
import styles from '../Styles/Signin.module.css'
import { useAuthValue } from '../AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

function Signup() {

    const nameRef = useRef();
    const passwardRef = useRef();
    const emailRef = useRef();

    const navigate = useNavigate();
    // const {createUser} = useAuthValue();

    async function handleSignup(e){
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            passward: passwardRef.current.value
        }

        // await createUser(data);
        // navigate("/signin");
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputForm}>
                <h1>SignUn</h1>
                <form action='' onSubmit={handleSignup}>
                    <input type='text' placeholder='enter name...' required ref={nameRef} />
                    <input type='email' placeholder='enter email...' required ref={emailRef} />
                    <input type='passward' placeholder='enter passward' required ref={passwardRef} />
                    <button type='submit'>Signin</button>
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
