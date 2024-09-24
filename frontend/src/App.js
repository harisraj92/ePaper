import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/Login/LoginPage';
import routes from './routes/routes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Layout setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
          >
            {/* Map over the routes and render the elements */}
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={<route.element />} // Correctly rendering the element as a React component
              />
            ))}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
