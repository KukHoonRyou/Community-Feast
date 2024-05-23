import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EatsPage from './pages/EatsPage';
import EatsDetailPage from './components/Eats/EatsDetailPage';
import EatsListPage from './components/Eats/EatsListPage';
import EatsCreateFormPage from './components/Eats/EatsCreateFormPage';
import MyDibsPage from './pages/MyDibsPage';
import MyDibsFormPage from './components/MyDibs/MyDibsFormPage';
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
import FoodTagsPage from './pages/FoodTagsPage';
import FoodTagsListPage from './components/FoodTags/FoodTagsListPage';
import FoodTagsDetailPage from './components/FoodTags/FoodTagsDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isLogin, setIsLogin] = useState(false); // State to store the login status
  const [isAdmin, setIsAdmin] = useState(false); // State to store the admin status

  return (
    <>
      <Router>
        <div>
          <NavBar isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/eats" element={<EatsPage />} />
            <Route path="/eats/:id" element={<EatsDetailPage />} />
            <Route path="/eats/list" element={<EatsListPage />} />
            <Route path="/eats/create" element={<EatsCreateFormPage />} />
            <Route path="/dibs/:id" element={<MyDibsPage />} />
            <Route path="/dibs/create" element={<MyDibsFormPage />} />
            <Route path="/dibs/history" element={<MyDibsHistoryPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/info" element={<UsersInfoManagePage />} />
            <Route path="/users/eats" element={<UsersEatsManagePage />} />
            <Route path="/users/dibs" element={<UsersDibsManagePage />} />
            <Route path="/foodtags" element={<FoodTagsPage />} />
            <Route path="/foodtags/list" element={<FoodTagsListPage />} />
            <Route path="/foodtags/:id" element={<FoodTagsDetailPage />} />
            <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
            <Route path="/login/form" element={<LoginFormPage setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />} />
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
    </>
  );
}

export default App;