// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { HouseIcon } from 'lucide-react';
import { Navbar } from "./components/index.js"
import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex border-t-slate-200 border-t-2">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col">
                <div className="flex flex-col flex-1 border-r-2 h-full w-64">
                    <Link to={"/home"} className="bg-black text-white pl-7 py-2 flex gap-2 text-lg font-bold items-center">
                        <HouseIcon />
                        Home
                    </Link>
                    <Navbar />
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
