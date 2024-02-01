
import React, { Fragment, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { db } from '../../Configurations/FirebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    //List of users in our database
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const users = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                });
                setUserList(users);
            },
            (error) => {
                console.log("Inside useEffect", error.message);
            });
    }, [isLoggedIn])

    async function createUser(data) {
        const index = userList.findIndex((user) => user.email === data.email);

        if (index !== -1) {
            toast.error("Email already registered, try again or signin");
            return;
        }

        const docRef = await addDoc(collection(db, "users"), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: [],

        });
        toast.success("User registered successfully");
        console.log("User created ", data);
    }

    async function signIn(data) {
        const index = userList.findIndex((user) => user.email === data.email);

        if (index === -1) {
            toast.error("Email is not registered, try again or signup");
            return;
        }
        console.log("Signin function data ", data);
        console.log("Signin function userList[index].password= ", userList[index].password);
        console.log("Signin function udata.password.password= ", data.password);

        if (userList[index].password === data.password) {
            toast.success("Signin successfull...");
            setIsLoggedIn(true);
            setUserLoggedIn(userList[index]);

            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(userLoggedIn));
            return true;
        }else {
            toast.error("Incorrect passward");
            return false;
        }
    }

    async function signOut() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");

        setIsLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("Signout successful...");

    }

    const providerValues = { createUser, signIn, signOut, isLoggedIn, setIsLoggedIn, userLoggedIn, setUserLoggedIn };

    return (
        <Fragment>
            <AuthContext.Provider value={providerValues}>
                <ToastContainer/>
                {children}
            </AuthContext.Provider>
        </Fragment>
    )
}

export default AuthProvider
