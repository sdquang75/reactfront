
import React, { useState, useEffect, useMemo } from 'react';
import styles from './AdminEmployeeDetailModal.module.css';
import { FiX, FiEdit2, FiEyeOff, FiEye } from 'react-icons/fi';






function AdminEmployeeDetailModal({ currentUser, onEditEmployee, isOpen, onClose, employeeData }) { 
  console.log(currentUser);
  const [showpassword, setShowpassword] = useState(false);

  if (!isOpen || !employeeData) {
    return null;
  }


  const {
    emp_no,
    ename,
    dpt_no,
    dpname,
    mgr_no,
    manager_name,
    tel,
    password,
    position,

  } = employeeData;


  const isAdmin = currentUser && currentUser.role === 'admin';
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButtonTop} aria-label="Close dialog">
          <FiX />
        </button>

        <div className={styles.employeeHeader}>
          <span className={styles.employeeNameHeader}>{ename || 'N/A'}</span>
          
          {isAdmin && typeof onEditEmployee === 'function' && (
            <button
              onClick={() => onEditEmployee(employeeData)}
              className={styles.editButtonModal}
              aria-label="社員情報を編集" 
            >
              <FiEdit2 />
            </button>
          )}
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>【社員番号】</span>
            <span className={styles.detailValue}>{emp_no || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>【部署】</span>
            <span className={styles.detailValue}>{dpname || dpt_no || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>【上司】</span>
            <span className={styles.detailValue}>{manager_name || mgr_no || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>【役職】</span>
            <span className={styles.detailValue}>{position || '一般'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>【電話番号】</span>
            <span className={styles.detailValue}>{tel || 'N/A'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>【パスワード】</span>
            <span className={styles.detailValuepassword}>
              {showpassword ? (password || 'N/A') : password}
              {/* {password && ( // 
                <button onClick={toggleShowpassword} className={styles.passwordVisibilityToggle}>
                  {showpassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )} */}
            </span>
          </div>
      
        </div>
       
     
      </div>
    </div>
  );
}

export default AdminEmployeeDetailModal;