import { Fragment, createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { db } from "./Configurations/FirebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { ToastContainer, toast } from "react-toastify";

const authContext = createContext();

export function useAuthValue(){
    const value = useContext(authContext);
    return value;
}

function AuthContext({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Who is logged in
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    //List of users in our database
    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        const unsubs = onSnapshot(
            collection(db, "users"), 
            (snapshot) => {
                const users = snapshot.docs.map((doc)=>{
                    return{
                        id: doc.id,
                        ...doc.data(),
                    }
                });
                setUserList(users);
            },
            (error) => {
              console.log("Inside useEffect", error.message);
            });
    },[isLoggedIn])

    async function createUser(data){
        const index = userList.findIndex((user)=>user.email===data.email);

        if(index!==-1){
            toast.error("Email already registered, try again or signin");
            return;
        }

        const docRef = await addDoc(collection(db, "users"),{
            name: "data.name",
            email: "data.email",
            password: "data.password",
            cart: [],
            orders: [],

        });
        toast.success("User registered successfully");

    }

    async function signIn(data){
        const index = userList.findIndex((user)=>user.email===data.email);

        if(index!==-1){
            toast.error("Email already registered, try again or signin");
            return;
        }

        if(userList[index].password===data.password){
            toast.success("Signin successfull...");
            setIsLoggedIn(true);
            setUserLoggedIn(userList[index]);

            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(userList[index]));
            return true;
        }
        else{
            toast.error("Incorrect passward");
            return false;
        }
    }

    async function signOut(){
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");

        setIsLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("Signout successful...");

    }

    return(
        <Fragment>
            <authContext.Provider value={{createUser, signIn, signOut, isLoggedIn, setIsLoggedIn, setUserLoggedIn}}>
                <ToastContainer/>
                {children}
            </authContext.Provider>
        </Fragment>
    )

}

export default AuthContext
