
import React, { useState } from 'react';
import styles from './AdminEmployeeDetailModal.module.css';
import { FiX, FiEdit2, FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';

import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';



function AdminEmployeeDetailModal({
  isOpen,
  onClose,
  employeeData,
  onEditEmployee,
  currentUser,
  onEmployeeActionCompleted 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 

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

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const isAdmin = currentUser && currentUser.role === 'admin';
  // Admin không thể xóa chính mình
  const canPerformActions = isAdmin && String(currentUser.emp_no) !== String(emp_no);

  const handleDeleteClick = () => {
    if (canPerformActions) {
      setIsDeleteConfirmOpen(true);
    }
  };

  const handleConfirmHardDelete = async () => {
    if (!canPerformActions) return;

    setIsProcessing(true);
    setIsDeleteConfirmOpen(false);
    try {
      const response = await fetch('http://localhost/PHP1/delete-employee.php', { // API 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_no: emp_no })
      });
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.message || `API Error: ${response.status}`);
      }

      // alert(result.message || '社員が正常に削除されました。');
      if (onEmployeeActionCompleted) {
        onEmployeeActionCompleted({ type: 'delete', emp_no: emp_no });
      }
      onClose();

    } catch (error) {
      console.error('削除処理中にエラーが発生しました:', error);
      alert(`削除処理中にエラーが発生しました: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className={styles.closeButtonTop} aria-label="Close dialog"><FiX /></button>
          <div className={styles.employeeHeader}>
            <span className={styles.employeeNameHeader}>{ename || 'N/A'}</span>
            {isAdmin && typeof onEditEmployee === 'function' && (
              <button
                onClick={() => onEditEmployee(employeeData)}
                className={styles.editButtonModal}
                aria-label="社員情報を編集"
                disabled={isProcessing}
              >
                <FiEdit2 />
              </button>
            )}
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.detailItem}><span className={styles.detailLabel}>社員番号:</span><span className={styles.detailValue}>{emp_no || 'N/A'}</span></div>
            <div className={styles.detailItem}><span className={styles.detailLabel}>所属部署:</span><span className={styles.detailValue}>{dpname || dpt_no || 'N/A'}</span></div>
            <div className={styles.detailItem}><span className={styles.detailLabel}>上司:</span><span className={styles.detailValue}>{manager_name || mgr_no || 'N/A'}</span></div>
            <div className={styles.detailItem}><span className={styles.detailLabel}>役職:</span><span className={styles.detailValue}>{position || '一般'}</span></div>
            <div className={styles.detailItem}><span className={styles.detailLabel}>電話番号:</span><span className={styles.detailValue}>{tel || 'N/A'}</span></div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>パスワード:</span>
              <span className={styles.detailValuePassword}>
                {showPassword ? (password || 'N/A') : (password ? '••••••••' : 'N/A')}
                {password && (
                  <button onClick={toggleShowPassword} className={styles.passwordVisibilityToggle} aria-label="パスワード表示切替">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                )}
              </span>
            </div>


          </div>

          {canPerformActions && (
            <div className={styles.actionsContainer}>
              <button
                onClick={handleDeleteClick}
                className={`${styles.actionButton} ${styles.hardDeleteButton}`}
                disabled={isProcessing}
                aria-label="社員情報を完全に削除"
              >
                {isProcessing ? '削除中...' : <><FiTrash2 />削除</>}
              </button>
            </div>
          )}
          {isAdmin && String(currentUser.emp_no) === String(emp_no) && (
            <p className={styles.infoMessage}>自分自身のアカウントは削除できません。</p>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmHardDelete}
        confirmButtonClass={styles.confirmHardDeleteButton}
        isProcessing={isProcessing}
      />
    </>
  );
}
export default AdminEmployeeDetailModal;