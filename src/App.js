import { Fragment } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Signin from './Components/Signin';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Components/Signup';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/signin", element: <Signin /> },
        { path: "/signup", element: <Signup /> }
      ]
    }
  ])
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
