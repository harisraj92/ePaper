import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgimage from '../../assets/images/newspaper-bg.png'

function LoginPage({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add authentication logic here, e.g., API request.
        if (username === 'admin' && password === 'admin') {
            // Set authentication state
            setIsAuthenticated(true);
            // If successful, navigate to the dashboard ("/")
            navigate('/');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="flex justify-end items-center h-screen">
            <div className="flex justify-center items-center h-screen">
                <img src={bgimage} alt="Person reading an eNewspaper" className="max-w-full h-auto" />
            </div>
            <div className="w-96 mr-60"> {/* Add margin-left here */}
                <h1 className="text-4xl text-center font-bold text-yellow-700 mb-8 logo">ePaper</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-700"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-700"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
