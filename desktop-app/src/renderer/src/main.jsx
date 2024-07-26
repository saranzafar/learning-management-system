import './assets/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Signup, SignIn, Home, FeeReport, Student, Subject, Teacher, Attendence, Timetable } from './pages/index';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/home',
        element: <Layout />,
        children: [
          {
            path: '/home',
            element: <Home />,
          },
          {
            path: '/home/teacher',
            element: <Teacher />,
          },
          {
            path: '/home/subject',
            element: <Subject />,
          },
          {
            path: '/home/timetable',
            element: <Timetable />,
          },
          {
            path: '/home/attendence',
            element: <Attendence />,
          },
          {
            path: '/home/student',
            element: <Student />,
          },
          {
            path: '/home/fee-report',
            element: <FeeReport />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
