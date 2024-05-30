import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import router components
import NavBar from './components/NavBar'; // Import NavBar component
import HomePage from './pages/HomePage'; // Import HomePage component
import AboutPage from './pages/AboutPage'; // Import AboutPage component
import EatsPage from './pages/EatsPage'; // Import EatsPage component
import EatsDetailPage from './components/Eats/EatsDetailPage'; // Import EatsDetailPage component
import EatsListPage from './components/Eats/EatsListPage'; // Import EatsListPage component
import EatsCreateFormPage from './components/Eats/EatsCreateFormPage'; // Import EatsCreateFormPage component
import MyDibsPage from './pages/MyDibsPage'; // Import MyDibsPage component
import MyDibsFormPage from './components/MyDibs/MyDibsFormPage'; // Import MyDibsFormPage component
import MyDibsHistoryPage from './components/MyDibs/MyDibsHistoryPage'; // Import MyDibsHistoryPage component
import UsersPage from './pages/UsersPage'; // Import UsersPage component
import UsersInfoManagePage from './components/Users/UsersInfoManagePage'; // Import UsersInfoManagePage component
import UsersEatsManagePage from './components/Users/UsersEatsManagePage'; // Import UsersEatsManagePage component
import UsersDibsManagePage from './components/Users/UsersDibsManagePage'; // Import UsersDibsManagePage component
import LoginPage from './pages/LoginPage'; // Import LoginPage component
import LoginFormPage from './components/Login/LoginFormPage'; // Import LoginFormPage component
import SignupPage from './pages/SignupPage'; // Import SignupPage component
import SignupFormPage from './components/Login/SignupFormPage'; // Import SignupFormPage component
import AdminPage from './pages/AdminPage'; // Import AdminPage component
import AdminUserManagePage from './components/Administration/AdminUserManagePage'; // Import AdminUserManagePage component
import AdminEatsManagePage from './components/Administration/AdminEatsManagePage'; // Import AdminEatsManagePage component
import AdminDibsManagePage from './components/Administration/AdminDibsManagePage'; // Import AdminDibsManagePage component
import AdminTagsManagePage from './components/Administration/AdminTagsManagePage'; // Import AdminTagsManagePage component
import FoodTagsPage from './pages/FoodTagsPage'; // Import FoodTagsPage component
import FoodTagsListPage from './components/FoodTags/FoodTagsListPage'; // Import FoodTagsListPage component
import FoodTagsDetailPage from './components/FoodTags/FoodTagsDetailPage'; // Import FoodTagsDetailPage component
import NotFoundPage from './pages/NotFoundPage'; // Import NotFoundPage component
import Footer from './Footer'; // Import Footer component

function App() {
  const [isLogin, setIsLogin] = useState(false); // State for login status
  const [isAdmin, setIsAdmin] = useState(false); // State for admin status

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    if (userId) {
      setIsLogin(true); // Set login status to true if userId exists
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (token) {
        setIsAdmin(true); // Set admin status to true if token exists (example logic)
      }
    }
  }, []); // Empty dependency array means this runs once on component mount

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove userId from local storage
    localStorage.removeItem('token'); // Remove token from local storage
    setIsLogin(false); // Set login status to false
    setIsAdmin(false); // Set admin status to false
    return <Navigate to="/" />; // Navigate to home page after logout
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Main container styling */}
        <NavBar isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} /> {/* NavBar component with props */}
        <div style={{ flex: 1, marginTop: '64px' }}> {/* Main content area styling */}
          <Routes>
            <Route path="/" element={<HomePage isLogin={isLogin} />} /> {/* HomePage route */}
            <Route path="/about" element={<AboutPage />} /> {/* AboutPage route */}
            <Route path="/eats" element={<EatsPage />} /> {/* EatsPage route */}
            <Route path="/eats/:id" element={<EatsDetailPage />} /> {/* EatsDetailPage route */}
            <Route path="/eats/list" element={<EatsListPage />} /> {/* EatsListPage route */}
            <Route path="/eats/create" element={<EatsCreateFormPage />} /> {/* EatsCreateFormPage route */}
            <Route path="/dibs/:id" element={<MyDibsPage />} /> {/* MyDibsPage route */}
            <Route path="/dibs/create" element={<MyDibsFormPage />} /> {/* MyDibsFormPage route */}
            <Route path="/dibs/history" element={<MyDibsHistoryPage />} /> {/* MyDibsHistoryPage route */}
            <Route path="/users" element={<UsersPage />} /> {/* UsersPage route */}
            <Route path="/users/info" element={<UsersInfoManagePage />} /> {/* UsersInfoManagePage route */}
            <Route path="/users/eats" element={<UsersEatsManagePage />} /> {/* UsersEatsManagePage route */}
            <Route path="/users/dibs" element={<UsersDibsManagePage />} /> {/* UsersDibsManagePage route */}
            <Route path="/foodtags" element={<FoodTagsPage />} /> {/* FoodTagsPage route */}
            <Route path="/foodtags/list" element={<FoodTagsListPage />} /> {/* FoodTagsListPage route */}
            <Route path="/foodtags/:id" element={<FoodTagsDetailPage />} /> {/* FoodTagsDetailPage route */}
            <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} /> {/* LoginPage route */}
            <Route path="/login/form" element={<LoginFormPage setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} /> {/* LoginFormPage route */}
            <Route path="/signup" element={<SignupPage />} /> {/* SignupPage route */}
            <Route path="/signup/form" element={<SignupFormPage />} /> {/* SignupFormPage route */}
            <Route path="/admin" element={<AdminPage />} /> {/* AdminPage route */}
            <Route path="/admin/users" element={<AdminUserManagePage />} /> {/* AdminUserManagePage route */}
            <Route path="/admin/eats" element={<AdminEatsManagePage />} /> {/* AdminEatsManagePage route */}
            <Route path="/admin/dibs" element={<AdminDibsManagePage />} /> {/* AdminDibsManagePage route */}
            <Route path="/admin/tags" element={<AdminTagsManagePage />} /> {/* AdminTagsManagePage route */}
            <Route path="/logout" element={handleLogout} /> {/* Logout route */}
            <Route path="*" element={<NotFoundPage />} /> {/* NotFoundPage route for unmatched paths */}
          </Routes>
        </div>
        <Footer /> {/* Footer component at the bottom */}
      </div>
    </Router>
  );
}

export default App; // Export the App component as default