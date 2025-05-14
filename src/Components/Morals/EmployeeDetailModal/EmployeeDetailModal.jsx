
import React, { useState, useEffect } from 'react';
import styles from './EmployeeDetailModal.module.css';
import StatusBadge from '../../Common/StatusBadge/StatusBadge';
import { FiX, FiEdit2 } from 'react-icons/fi';
import EmployeeEditModal from '../EmployeeEditModal/EmployeeEditModal';

const formatDateTime = (dateTimeString) => {

  if (!dateTimeString) return '未登録';
  try {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateTimeString;
  }
};

function EmployeeDetailModal({ isOpen, onClose, employeeData: initialEmployeeData, currentUser, onSafetyInfoUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentEmployeeDisplayData, setCurrentEmployeeDisplayData] = useState(initialEmployeeData);


  useEffect(() => {
    if (initialEmployeeData) {
      setCurrentEmployeeDisplayData(initialEmployeeData);
    }
  }, [initialEmployeeData]);


  if (!isOpen || !currentEmployeeDisplayData) {
    return null;
  }

  const canEdit = currentUser && (
    currentUser.role === 'admin' ||
    (currentUser.emp_no && currentEmployeeDisplayData.emp_no && String(currentUser.emp_no) === String(currentEmployeeDisplayData.emp_no))
  );

  const handleOpenEditModal = () => {
    if (canEdit) {
      setIsEditModalOpen(true);
    } else {
      console.log("あなたには、この従業員の詳細を編集する権限がありません。");
      alert("あなたには、この従業員の詳細を編集する権限がありません。");
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = async (updatedSafetyInfo) => {
    console.log("Saving changes for employee:", currentEmployeeDisplayData.emp_no, "Data:", updatedSafetyInfo);
    try {
      const response = await fetch('http://localhost/php1/safety_status_check.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          emp_no: currentEmployeeDisplayData.emp_no,

          status: updatedSafetyInfo.status,
          commute: updatedSafetyInfo.commute,
          injury: updatedSafetyInfo.injury,
          updated_by: currentUser.emp_no
        }),
      });

      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || `API Error: ${response.status}`);
      }

      console.log('API Update Success:', result);
      // alert('安否情報が正常に更新されました。');


      const newDataForDetailView = {
        ...currentEmployeeDisplayData,
        ...updatedSafetyInfo,
        // ins_time: new Date().toISOString()
      };
      setCurrentEmployeeDisplayData(newDataForDetailView);


      if (onSafetyInfoUpdate) {
        onSafetyInfoUpdate(newDataForDetailView);
      }

    } catch (error) {
      console.error('Failed to save changes:', error);
      // alert(`エラーが発生しました。変更を保存できませんでした。\n${error.message}`);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close dialog"><FiX /></button>
          <h2 className={styles.title}>安否情報の詳細</h2>
          <div className={styles.employeeHeader}>
            <div className={styles.nameAndStatus}>

              <span className={styles.employeeName}>{currentEmployeeDisplayData.name || 'N/A'}</span>
              <StatusBadge status={currentEmployeeDisplayData.status} />
            </div>
            {canEdit ? (
              <button onClick={handleOpenEditModal} className={styles.editButton} aria-label="Edit details"><FiEdit2 /></button>
            ) : (
              <span className={styles.editButtonDisabled} aria-label="Cannot edit details"><FiEdit2 /></span>
            )}
          </div>
          <div className={styles.detailsData}>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>【出社状況】</span>
              <span className={styles.dataValue}>{currentEmployeeDisplayData.commute || '未登録'}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>【怪我の状況】</span>
              <span className={styles.dataValue}>{currentEmployeeDisplayData.injury || '未登録'}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>【登録日時】</span>

              <span className={styles.dataValue}>{formatDateTime(currentEmployeeDisplayData.ins_time)}</span>
            </div>
          </div>
        </div>
      </div>
      <EmployeeEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveChanges}

        initialData={currentEmployeeDisplayData}
      />
    </>
  );
}
export default EmployeeDetailModal;