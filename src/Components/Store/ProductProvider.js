import { useContext, useEffect, useState } from "react";
import React from 'react'
import { AuthContext } from "./AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../Configurations/FirebaseConfig";
import { data } from "../../Assets/Data";
import { ProductContext } from "./ProductContext";

function ProductProvider({children}) {

    const { isLoggedIn, setIsLoggedIn, userLoggedIn, setUserLoggedIn } = useContext(AuthContext);
    const [itemInCart, setItemInCart] = useState(0);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [myorders, setMyorders] = useState([]);

    useEffect(()=>{
        const token = window.localStorage.getItem("token");
        if(token){
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            setIsLoggedIn(token);
            setUserLoggedIn(user);
        }
    }, []);

    useEffect(()=>{
        if(isLoggedIn){
            const unsub = onSnapshot(doc(db, "users", userLoggedIn.id), (doc)=>{
                setCart(doc.data().cart);
                setMyorders(doc.data().orders);

            });
            let sum = 0;
            cart.map((item)=>Number(sum+=item.price));
            setTotal(sum);
            setItemInCart(cart.length);
        }
    },[userLoggedIn]);

    async function addToCart(product){
        console.log("addToCart() is called for: ", product);
        if(!isLoggedIn){
            toast.error("Please login first...");
            return;
        }

        const index = cart.findIndex((item)=>item.name===product.name);
        console.log("Index: ", index);
        if(index!==-1){
            increaseQuant(cart[index]);
            return;
        }

        const userRef = doc(db, "users", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayUnion({quantity: 1, ...product}),
        });
        setTotal(Number(total+product.price));
        setItemInCart(itemInCart+1);
        toast.success("Added to cart...");
    
    }

    async function increaseQuant(product){
        console.log("increaseQuant() is called");
        const index = cart.findIndex((item)=>item.name===product.name);
        cart[index].quantity++;
        setCart(cart);

        const userRef = doc(db, "users", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart, 
        })
        setItemInCart(itemInCart+1);
        setTotal(Number(total+cart[index].price));
    }

    async function decreaseQuant(product){
        console.log("decreaseQuant() is called");
        const index = cart.findIndex((item)=>item.name===product.name);
        if(cart[index].quantity>1){
            cart[index].quantity--;
        }else{
            cart.splice(index, 1);
        }

        setCart(cart);
        setItemInCart(itemInCart-1);

        const userRef = doc(db, "users", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart, 
        })
    }

    async function removeFromCart(product){
        console.log("removeFromCart() is called");
        const userRef = doc(db, "users", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayRemove(product), 
        })

        setTotal(Number(total-(product.quantity*product.price)));
        setItemInCart(itemInCart-product.quantity);
        toast.success("Removed from cart...");
    }

    async function clearCart(){
        console.log("clearCart() is called");
        if(itemInCart===0){
            toast.error("Cart is already empty");
            return;
        }

        const userRef = doc(db, "users", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: [], 
        })
        setTotal(0);
        setItemInCart(0);
        toast.success("Cart is cleared");
    }

    async function purchaseAll(){
        console.log("purchaseAll() is called");
        const currentDate = getDate();
        const userRef = doc(db, "users", userLoggedIn.id);
        await updateDoc(userRef, {
            orders: arrayUnion({date: currentDate, list: cart, amount: total, ...myorders }),
        })

        clearCart();
    }

    function getDate(){
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return (`${day}-${month}-${year}`);
    }

    const providerValues = {data, addToCart, cart, total, setTotal, removeFromCart, clearCart, purchaseAll, increaseQuant, decreaseQuant, itemInCart, myorders }

    return (
        <ProductContext.Provider value={providerValues}>
            {children}
        </ProductContext.Provider>
        
    )
}

export default ProductProvider
