import './App.css';
import React, { useState, useEffect } from 'react';
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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // {
  //   emp_no: "00193",
  //   name: "大野 未来",
  //   department: "総務",
  //   status: "safe",
  //   commute: "テレワーク",
  //   injury: "なし",
  //   timestamp: "2025-05-01T01:25:12Z",
  //   role: "admin",
  // }


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


  const handleLoginSuccess = (userData) => {

    setCurrentUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));
    // if (userData.role === 'admin') {
    //   navigate('/admin');
    // } else {
    //   navigate('/safetylist');
    // }
  };


  const handleLogout = () => {
    console.log("Logging out...");
    setCurrentUser(null);
    localStorage.removeItem('user');

    navigate('/login');
    // ログアウト後、ログインページへリダイレクトする。
  };





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
            currentUser ? <SafetyReportPage /> : <Navigate to="/login" replace />
          }
        />


        <Route
          path='/safetylist'
          element={
            currentUser ? <EmployeeSafetyList /> : <Navigate to="/login" replace />
          }
        />


        <Route
          path='/admin'
          element={
            currentUser && currentUser.role === 'admin' ? (
              <AdminMenuPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />


        <Route
          path='/employees'
          element={
            currentUser && currentUser.role === 'admin' ? (
              <AdminEmployeeListPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path='/add-employee'
          element={
            currentUser && currentUser.role === 'admin' ? (
              <AdminAddEmployeePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path='/delete-employee'
          element={
            currentUser && currentUser.role === 'admin' ? (
              <AdminDeletePage />
            ) : (
              <Navigate to="/login" replace />
            )
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