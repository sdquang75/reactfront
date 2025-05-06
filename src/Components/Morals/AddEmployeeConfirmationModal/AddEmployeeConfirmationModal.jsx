import React from 'react';
import styles from './AddEmployeeConfirmationModal.module.css'; 
import { FiX } from 'react-icons/fi';


function AddEmployeeConfirmationModal({ isOpen, onClose, onConfirm, data }) {
  if (!isOpen || !data) {
    return null;
  }

  
  const formatDisplayValue = (value) => {
      // Hiển thị '---' nếu giá trị là null, undefined hoặc chuỗi rỗng
      return (value === null || value === undefined || value === '') ? '---' : value;
  };
  // ------------------------------------------------------

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close confirmation">
          <FiX />
        </button>

        <h2 className={styles.title}>入力内容の確認</h2>
        <p className={styles.instructions}>
          入力内容をご確認ください<br/>問題なければ「登録する」ボタンを押してください
        </p>

       
        <div className={styles.confirmationData}>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【氏名】</span>
            <span className={styles.dataValue}>{formatDisplayValue(data.name)}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【所属部署】</span>
            <span className={styles.dataValue}>{formatDisplayValue(data.department)}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【上司番号】</span>
            <span className={styles.dataValue}>{formatDisplayValue(data.supervisorId)}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【電話番号】</span>
            <span className={styles.dataValue}>{formatDisplayValue(data.phoneNumber)}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【パスワード】</span>
          
            <span className={styles.dataValue}>{formatDisplayValue(data.password)}</span>
          </div>
          
        </div>

        
        <button onClick={onConfirm} className={styles.confirmButton}>
          登録する 
        </button>

        
        <button onClick={onClose} className={styles.backButton}>
          戻る 
        </button>
      </div>
    </div>
  );
}

export default AddEmployeeConfirmationModal;