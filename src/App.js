import './App.css';
import Navbar from './Components/Navbar';
import Signin from './Components/Signin';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Components/Signup';
import AuthProvider from './Components/Store/AuthProvider';
import Home from './Components/Home';
import ProductProvider from './Components/Store/ProductProvider';
import MyOrders from './Components/MyOrders';
import { Fragment } from 'react';
import Cart from './Components/Cart';
import ErrorPage from './Components/ErrorPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage/>,
      children: [
        { path: "/signin", element: <Signin /> },
        { path: "/signup", element: <Signup /> },
        { path: "/", element: <Home /> },
        { path: "/myorder", element: <MyOrders/> },
        { path: "/cart", element: <Cart/>}
      ]
    }
  ]);
  return (
    <Fragment>
      <AuthProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
