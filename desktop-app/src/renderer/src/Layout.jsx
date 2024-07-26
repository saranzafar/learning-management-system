// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { HouseIcon } from 'lucide-react';
import { Navbar } from "./components/index.js"
import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex h-screen w-screen border-t-slate-200 border-2">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-64 border-r-2">
                <div className="flex flex-col flex-1 overflow-y-auto">
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
