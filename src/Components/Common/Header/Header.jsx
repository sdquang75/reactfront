import React from 'react';
import styles from './Header.module.css';

import { FiLogOut } from 'react-icons/fi';
import { Icon } from '@chakra-ui/react';
// import { Icon } from '@chakra-ui/react'; //  dùng Chakra

import { FiUserX } from "react-icons/fi";

import { Link } from 'react-router-dom';
function Header({ title = "安否確認システム", showLogout = true, onLogout }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      {showLogout && (
        <Link to ="/login"> <button onClick={onLogout}  className={styles.logoutButton}>
        {/* <i className={styles.ButtonIcon}><FiUserX /> </i> */}
          ログアウト
        </button></Link>
      )}
    </header>
  );
}

export default Header;