import React from 'react';
import styles from './DeleteConfirmModal.module.css'; 
import { FiX, FiAlertTriangle } from 'react-icons/fi'; 

function DeleteAnpiConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close confirmation">
          <FiX />
        </button>

        <div className={styles.warningIcon}>
            <FiAlertTriangle size={30} color="#EF4444"/> {/* Icon  */}
        </div>

        <h2 className={styles.title}>削除の確認</h2> 
        <p className={styles.message}>
        すべての社員の安否情報を削除します。<br/>この操作は取り消せません。<br/> 本当に削除してもよろしいですか？
        </p>

        <div className={styles.buttonGroup}>
          
            <button onClick={onClose} className={`${styles.actionButton} ${styles.cancelButton}`}>
             キャンセル 
            </button>
             
            <button onClick={onConfirm} className={`${styles.actionButton} ${styles.deleteButton}`}>
             削除する 
            </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAnpiConfirmModal;