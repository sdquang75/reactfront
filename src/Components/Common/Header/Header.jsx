import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
function Header({ title = "安否確認システム", currentUser, onLogout }) {

  const navigate = useNavigate();
  const gotoHomepage  =  () => navigate('/');
  return (
    <header className={styles.header}>

      <h1 className={styles.headerTitle } onClick={gotoHomepage} >{title}</h1>


      {currentUser && (
        <div className={styles.userInfo}>

          {currentUser.name && (
            <span className={styles.userName}>
              ようこそ、{currentUser.name}さん

            </span>
          )}


          <button onClick={onLogout} className={styles.logoutButton}>
            {/* Có thể thêm icon nếu muốn */}
            {/* <FiLogOut className={styles.logoutIcon} /> */}
            ログアウト
          </button>
        </div>
      )}



    </header>
  );
}

export default Header;