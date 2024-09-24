import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <header className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-300 shadow-md w-full">
            <div className="flex items-center">
                {/* Hamburger Menu Icon */}
                <button onClick={toggleSidebar} className="mr-4 focus:outline-none">
                    <FontAwesomeIcon icon={faBars} className="text-2xl text-yellow-700" />
                </button>
                <h1 className="text-3xl font-bold text-yellow-700">ePaper</h1>
            </div>
            <div className="flex items-center">
                <span className="mr-4">Admin</span>
                {/* Sign Out Icon */}
                <button onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-xl text-red-600" />
                </button>
            </div>
        </header>
    );
};

export default Header;
