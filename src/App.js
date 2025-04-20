import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Routers/Login/LoginPage'
import SafetyReportPage from './Components/Routers/SafetyReportPage/SafetyReportPage';

function App() {
  return (
 <Router>
  <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={<Login />} />
    <Route path="/safety" element={<SafetyReportPage />} />
  </Routes>
 </Router>
  );
}

export default App;
