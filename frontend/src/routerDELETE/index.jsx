import { createBrowserRouter } from 'react-router-dom';
import LoginFormModal from '../components/LoginFormModal';
// import LoginFormPage from '../components/LoginFormPage';
import SignupFormModal from '../components/SignupFormModal';
// import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormModal />,
      },
      {
        path: "signup",
        element: <SignupFormModal />,
      },
    ],
  },
]);
