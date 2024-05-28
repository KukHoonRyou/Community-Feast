import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Footer from './Footer'; // Footer 컴포넌트를 불러옵니다

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLogin(true);
      // Admin 체크 로직 추가
      const token = localStorage.getItem('token');
      if (token) {
        // token을 사용하여 관리자 여부 확인 로직 추가
        setIsAdmin(true); // 예시로 관리자 설정
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLogin(false);
    setIsAdmin(false);
    return <Navigate to="/" />;
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
        <div style={{ flex: 1, marginTop: '64px' }}> {/* 네비게이션 바 높이만큼 마진 추가 */}
          <Routes>
            <Route path="/" element={<HomePage isLogin={isLogin} />} />
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
            <Route path="/logout" element={handleLogout} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer /> {/* 푸터를 페이지 하단에 추가 */}
      </div>
    </Router>
  );
}

export default App;