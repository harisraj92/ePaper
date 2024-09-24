import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfo, faPenNib, faNewspaper } from '@fortawesome/free-solid-svg-icons'; // Add icons you need

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <aside className={`bg-yellow-600 h-full p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
            <ul className="space-y-6">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'flex items-center text-white bg-yellow-700 p-2 rounded transition duration-300'
                                : 'flex items-center text-white p-2 rounded hover:bg-yellow-700 transition duration-300'
                        }
                    >
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        {isSidebarOpen && <span>Home</span>}
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/NewspaperEditor"
                        className={({ isActive }) =>
                            isActive
                                ? 'flex items-center text-white bg-yellow-700 p-2 rounded transition duration-300'
                                : 'flex items-center text-white p-2 rounded hover:bg-yellow-700 transition duration-300'
                        }
                    >
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        {isSidebarOpen && <span>DesignEditor</span>}
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
