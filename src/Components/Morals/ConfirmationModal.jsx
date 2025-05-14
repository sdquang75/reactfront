import React from 'react';
import styles from './ConfirmationModal.module.css';
import { Link } from 'react-router-dom';



function ConfirmationModal({ isOpen, onClose, onConfirm, data }) {
  if (!isOpen) {
    return null;
  }

  return (

    <div className={styles.overlay} onClick={onClose}>

      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} className={styles.closeButton}>×</button>

        <h2 className={styles.title}>入力内容の確認</h2>
        <p className={styles.instructions}>
          入力内容をご確認ください<br />問題なければ「登録する」ボタンを押してください
        </p>




        {/* ///////////////////////////////////////////// */}

        {/* <div className={styles.confirmationData}>
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
        </div> */}

        <div className={styles.confirmationData}>

          {data && Object.entries(data).map(([key, value]) => (
            <div className={styles.dataRow} key={key}>
              <span className={styles.dataLabel}>【{key}】</span>
              <span className={styles.dataValue}>{value || '未選択'}</span>
            </div>
          ))}
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

export default ConfirmationModal;