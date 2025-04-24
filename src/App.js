import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Routers/Login/LoginPage'
import SafetyReportPage from './Components/Routers/SafetyReportPage/SafetyReportPage';
import EmployeeSafetyList from './Components/Routers/EmployeeSafetyList/EmployeeSafetyList';

import AdminMenuPage from './Components/Routers/AdminMenuPage/AdminMenuPage';
import AdminEmployeeListPage from './Components/Routers/AdminEmployeeListPage/AdminEmployeeListPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/safety" element={<SafetyReportPage />} />
        <Route path='/safetylist' element={<EmployeeSafetyList />} />
        <Route path='/admin' element={<AdminMenuPage />} />
        <Route path='/employees' element={<AdminEmployeeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
