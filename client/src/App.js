import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from "./UserContext";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EatsPage from './pages/EatsPage';
import EatsDetailPage from './components/Eats/EatsDetailPage';
import EatsListPage from './components/Eats/EatsListPage';
import EatsCreateFormPage from './components/Eats/EatsCreateFormPage';
import MyDibsPage from './pages/MyDibsPage';
import MyDibsListPage from './components/MyDibs/MyDibsListPage';
import MyDibsHistoryPage from './components/MyDibs/MyDibsHistoryPage';
import UsersPage from './pages/UsersPage';
import UsersInfoManagePage from './components/Users/UsersInfoManagePage';
import UsersEatsManagePage from './components/Users/UsersEatsManagePage';
import UsersDibsManagePage from './components/Users/UsersDibsManagePage';
import LoginPage from './pages/LoginPage';
import LoginFormPage from './components/Login/LoginFormPage';
import SignupPage from './pages/SignupPage';
import SignupFormPage from './components/Login/SignupFormPage';
import AdminPage from './pages/AdminPage';
import AdminUserManagePage from './components/Administration/AdminUserManagePage';
import AdminEatsManagePage from './components/Administration/AdminEatsManagePage';
import AdminDibsManagePage from './components/Administration/AdminDibsManagePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isLogin, setIsLogin] = useState(false); // State to store the login status
  const [isAdmin, setIsAdmin] = useState(false); // State to store the admin status

  return (
    <>
      <UserContext.Provider
        value={{ isLogin, setIsLogin, isAdmin, setIsAdmin }}>
        <Router>
          <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/eats" element={<EatsPage />} />
                <Route path="/eats/:id" element={<EatsDetailPage />} />
                <Route path="/eats/list" element={<EatsListPage />} />
                <Route path="/eats/create" element={<EatsCreateFormPage />} />
                <Route path="/mydibs" element={<MyDibsPage />} />
                <Route path="/mydibs/list" element={<MyDibsListPage />} />
                <Route path="/mydibs/history" element={<MyDibsHistoryPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/info" element={<UsersInfoManagePage />} />
                <Route path="/users/eats" element={<UsersEatsManagePage />} />
                <Route path="/users/dibs" element={<UsersDibsManagePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/form" element={<LoginFormPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signup/form" element={<SignupFormPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/users" element={<AdminUserManagePage />} />
                <Route path="/admin/eats" element={<AdminEatsManagePage />} />
                <Route path="/admin/dibs" element={<AdminDibsManagePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App; 