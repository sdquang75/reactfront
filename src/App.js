import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Routers/Login/Login'
function App() {
  return (
 <Router>
  <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={<Login />} />
  </Routes>
 </Router>
  );
}

export default App;
