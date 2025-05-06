
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ResetLocation } from './ResetLocation'; 

function ScrollToTop() {
  const { pathname } = useLocation(); 

  useEffect(() => {
    // Khi pathname thay đổi, gọi hàm ResetLocation
    ResetLocation();
  }, [pathname]); 

  return null; // Component này không render ra thứ gì trên giao diện
}

export default ScrollToTop;