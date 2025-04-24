import React from 'react';
import styles from './ConfirmationModal.module.css';
import { Link } from 'react-router-dom';



function ConfirmationModal({ isOpen, onClose, onConfirm, data }) {
  if (!isOpen) {
    return null; // Không render gì nếu modal không mở
  }

  return (
    // Lớp phủ mờ toàn màn hình
    <div className={styles.overlay} onClick={onClose}> {/* Click bên ngoài để đóng */}
      {/* Ngăn việc click vào modal box cũng trigger onClose của overlay */}
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng 'X' */}
        <button onClick={onClose} className={styles.closeButton}>×</button>

        <h2 className={styles.title}>入力内容の確認</h2>
        <p className={styles.instructions}>
          入力内容をご確認ください<br />問題なければ「登録する」ボタンを押してください
        </p>




  {/* ///////////////////////////////////////////// */}
        {/* Phần hiển thị thông tin xác nhận */}
        <div className={styles.confirmationData}>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【安否状況】</span>
            <span className={styles.dataValue}>
              {('safetyStatus', data?.safetyStatus)}
            </span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【出社状況】</span>
            <span className={styles.dataValue}>
              {('attendanceStatus', data?.attendanceStatus)}
            </span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【怪我の状況】</span>
            <span className={styles.dataValue}>
              {('injuryStatus', data?.injuryStatus)}
            </span>
          </div>
        </div>

        <Link to="/safetylist">
          <button onClick={onConfirm} className={styles.confirmButton}>
            登録する
          </button></Link>
        <button onClick={onClose} className={styles.backButton}>
          戻る
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;