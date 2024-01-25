import './App.css';
import Navbar from './Components/Navbar';
import Signin from './Components/Signin';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Components/Signup';
import AuthProvider from './Components/Store/AuthProvider';

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
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
