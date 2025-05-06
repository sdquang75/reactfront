import React from 'react';
import styles from './Header.module.css';
// Import các icon nếu bạn muốn dùng lại
// import { FiLogOut, FiUserX } from 'react-icons/fi';
// import { Icon } from '@chakra-ui/react'; // Ví dụ Chakra

// Bỏ Link vì không cần thiết cho nút logout nữa
// import { Link } from 'react-router-dom';

// Nhận currentUser và onLogout thay vì showLogout
function Header({ title = "安否確認システム", currentUser, onLogout }) {
  return (
    <header className={styles.header}>
      {/* Có thể thêm Link về trang chủ nếu muốn */}
      <h1 className={styles.headerTitle}>{title}</h1>

      {/* Hiển thị thông tin user và nút logout nếu đã đăng nhập */}
      {currentUser && (
        <div className={styles.userInfo}>
           {/* Tùy chọn: Hiển thị tên người dùng */}
           {currentUser.name && (
              <span className={styles.userName}>
                ようこそ、{currentUser.name}さん
                 {/* Welcome, {currentUser.name} */}
              </span>
           )}

           {/* Nút Logout - không còn bọc trong Link */}
           <button onClick={onLogout} className={styles.logoutButton}>
             {/* Có thể thêm icon nếu muốn */}
             {/* <FiLogOut className={styles.logoutIcon} /> */}
             ログアウト {/* Logout */}
           </button>
        </div>
      )}

      {/* Nếu chưa đăng nhập (currentUser là null), sẽ không hiển thị gì ở đây */}

    </header>
  );
}

export default Header;

/* --- Thêm CSS cho userInfo và userName nếu cần trong Header.module.css --- */
/*
.userInfo {
  display: flex;
  align-items: center;
  gap: 1rem; // Khoảng cách giữa tên và nút
}

.userName {
  color: #e9ecef; // Màu sáng hơn trên nền tối của header
  font-size: 0.9rem;
}

.logoutButton {
  // Giữ nguyên hoặc chỉnh sửa style nút logout của bạn
  background-color: #f8f9fa;
  color: #212529;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.logoutButton:hover {
  background-color: #e2e6ea;
}

// CSS cho icon nếu bạn thêm vào
.logoutIcon {
  margin-right: 0.3rem;
  vertical-align: middle; // Căn chỉnh icon với text
}

*/