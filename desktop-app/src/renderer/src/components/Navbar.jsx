import React from 'react';
import { UserRoundPen, BookOpenTextIcon, CalendarDaysIcon, ListTodoIcon, ScrollIcon, LogOutIcon, Users2Icon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
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

    return (
        <div className="flex flex-col h-full ">
            <ToastContainer />
            <nav className="flex-1 px-4 py-4">
                <Link to="/home/teacher"
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md">
                    <UserRoundPen strokeWidth={1.5} />
                    Teacher
                </Link>
                <Link to="/home/subject"
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md">
                    <BookOpenTextIcon strokeWidth={1.5} />
                    Subject
                </Link>
                <Link to="/home/timetable"
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md">
                    <CalendarDaysIcon strokeWidth={1.5} />
                    Timetable
                </Link>
                <Link to="/home/attendence"
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md">
                    <ListTodoIcon strokeWidth={1.5} />
                    Attendence
                </Link>
                <Link to="/home/student"
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md">
                    <Users2Icon strokeWidth={1.5} />
                    Student
                </Link>
                <Link to="/home/fee-report"
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 gap-2 font-semibold rounded-md">
                    <ScrollIcon strokeWidth={1.5} />
                    Fee Report
                </Link>
            </nav>
            <nav className="px-4 py-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 my-2 text-gray-600 hover:text-red-600 gap-2 font-semibold rounded-md w-full text-left"
                >
                    <LogOutIcon strokeWidth={1.5} />
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Navbar;
