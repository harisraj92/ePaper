import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ setIsAuthenticated }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Sidebar state

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar visibility
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} setIsAuthenticated={setIsAuthenticated} />

            {/* Main content with Sidebar and Outlet for routing */}
            <div className="flex flex-grow">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <main className="p-4 flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
                    <Outlet />  {/* This renders the child routes */}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
