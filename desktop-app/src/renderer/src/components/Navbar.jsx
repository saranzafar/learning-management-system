import React from 'react';
import { UserRoundPen, BookOpenTextIcon, CalendarDaysIcon, ListTodoIcon, ScrollIcon, LogOutIcon, Users2Icon } from "lucide-react";
import { Link, useNavigate, NavLink } from 'react-router-dom';
import conf from '../conf/conf';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Get the token from Electron storage
            const token = await window.electronAPI.getUserData();
            console.log("token == ", token.token);
            await axios.post(`${conf.backendUrl}admin/logout-admin`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token?.token}`,
                    },
                }
            )
            await window.electronAPI.deleteUserData();

            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error(`Error: ${error}`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div className="h-[90vh] flex flex-col justify-between">
            <ToastContainer />
            <nav className="flex-1 px-4 py-4">
                <NavLink
                    to="/home/teacher"
                    className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-gray-100 text-gray-700' : '',
                            'flex items-center px-4 py-2 my-4 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md  '
                        )}>
                    <UserRoundPen />
                    Teacher
                </NavLink>
                <NavLink to="/home/subject"
                    className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-gray-100 text-gray-700' : '',
                            'flex items-center px-4 py-2 my-4 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md '
                        )}>
                    <BookOpenTextIcon strokeWidth={1.5} />
                    Subject
                </NavLink>
                <NavLink to="/home/timetable"
                    className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-gray-100 text-gray-700' : '',
                            'flex items-center px-4 py-2 my-4 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md '
                        )
                    }>
                    <CalendarDaysIcon strokeWidth={1.5} />
                    Timetable
                </NavLink>
                <NavLink to="/home/attendence"
                    className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-gray-100 text-gray-700' : '',
                            'flex items-center px-4 py-2 my-4 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md '
                        )
                    }>
                    <ListTodoIcon strokeWidth={1.5} />
                    Attendence
                </NavLink>
                <NavLink to="/home/student"
                    className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-gray-100 text-gray-700' : '',
                            'flex items-center px-4 py-2 my-4 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md '
                        )
                    }>
                    <Users2Icon strokeWidth={1.5} />
                    Student
                </NavLink>
                <NavLink to="/home/fee-report"
                    className={({ isActive }) =>
                        classNames(
                            isActive ? 'bg-gray-100 text-gray-700' : '',
                            'flex items-center px-4 py-2 my-4 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md '
                        )
                    }>
                    <ScrollIcon strokeWidth={1.5} />
                    Fee Report
                </NavLink>
            </nav>
            <nav className="px-4 py-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 my-4 text-gray-600 hover:text-red-600 gap-2 font-semibold rounded-md  w-full text-left"
                >
                    <LogOutIcon strokeWidth={1.5} />
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Navbar;
