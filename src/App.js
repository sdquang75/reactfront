import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



// --- (Pages) ---
import LoginPage from './Components/Routers/Login/LoginPage';
import SafetyReportPage from './Components/Routers/SafetyReportPage/SafetyReportPage';
import EmployeeSafetyList from './Components/Routers/EmployeeSafetyList/EmployeeSafetyList';
import AdminMenuPage from './Components/Routers/AdminMenuPage/AdminMenuPage';
import AdminEmployeeListPage from './Components/Routers/AdminEmployeeListPage/AdminEmployeeListPage';
import NotFound from './Components/Routers/404/NotFound';
import AdminAddEmployeePage from './Components/Routers/AdminAddEmployeePage/AdminAddEmployeePage';
import AdminDeletePage from './Components/Routers/AdminDeletePage/AdminDeletePage';

import Header from './Components/Common/Header/Header';
import ScrollToTop from './Components/Misc/ScrollOnTop';

const ProtectedRoute = ({ currentUser, allowedRoles, children }) => {
  if (!currentUser) {

    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {

    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/safetylist'} replace />;
  }
  return children;
};




function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();



  // --- localStorage を確認するための useEffect フック ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {

        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);


  const handleLoginSuccess = useCallback((userData) => {

    setCurrentUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.role === 'admin') {
      // Admin 
      navigate('/admin', { replace: true });
    } else {
      // User  SafetyReportPage
      navigate('/safety', { replace: true, state: { isFirstPageAfterLogin: true } });
    }
  }, [navigate]);


  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    setCurrentUser(null);
    localStorage.removeItem('user');

    navigate('/login');
    // ログアウト後、ログインページへリダイレクトする。
  }, [navigate]);

  const handleUserProfileUpdate = useCallback((updatedUserDataFromApi) => {
    console.log('App.js: User profile updated, API returned:', updatedUserDataFromApi);



    const updatedUser = {
      ...currentUser, // Giữ lại các thông tin cũ không thay đổi 
      ...updatedUserDataFromApi,
      name: updatedUserDataFromApi.ename || updatedUserDataFromApi.name
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));


  }, [currentUser, setCurrentUser]);



  return (
    <>

      <Header currentUser={currentUser} onLogout={handleLogout} />

      <ScrollToTop />

      <Routes>

        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'admin' ? '/admin' : '/safety'} replace />
            ) : (

              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />


        <Route
          path="/safety"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRoles={['user', 'admin']}>
              <SafetyReportPage currentUser={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />



        <Route
          path="/safetylist"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRoles={['user', 'admin']}>

              {currentUser && <EmployeeSafetyList dpt_no={currentUser.dpt_no} currentUser={currentUser} />}
            </ProtectedRoute>
          }
        />


        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRoles={['admin']}>
              <AdminMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRoles={['admin']}>
              <AdminEmployeeListPage currentUser={currentUser} onCurrentUserProfileUpdate={handleUserProfileUpdate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRoles={['admin']}>
              <AdminAddEmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete-employee"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRoles={['admin']}>
              <AdminDeletePage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'admin' ? '/admin' : '/safetylist'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />



        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;