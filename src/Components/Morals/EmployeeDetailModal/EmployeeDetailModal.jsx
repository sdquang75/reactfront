import React from 'react';
import styles from './EmployeeDetailModal.module.css';
import StatusBadge from '../../Common/StatusBadge/StatusBadge'; // Import badge
import { FiX, FiEdit2 } from 'react-icons/fi'; // Icon
import EmployeeEditModal from '../EmployeeEditModal/EmployeeEditModal';
import { useState } from 'react';
// TIME FORMAT
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
///////////////////////////////////////////////////////////////////
function EmployeeDetailModal({ isOpen, onClose, employeeData }) {
  // EDIT MODAL
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  if (!isOpen || !employeeData) {
    return null;
  }

  const canEdit = true; //  false



  const handleOpenEditModal = () => {
    if (canEdit) {  //admin can change
      setIsEditModalOpen(true);
    } else {
      // 
    }
  }; const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // close modal
  }; const handleSaveChanges = (updatedData) => {
    console.log("Saving changes:", updatedData);
    // API
    setIsEditModalOpen(false);

  };



  return (<>
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close dialog">
          <FiX />
        </button>

        <h2 className={styles.title}>安否情報の詳細</h2>

        <div className={styles.employeeHeader}>
          <div className={styles.nameAndStatus}>
            <span className={styles.employeeName}>{employeeData.name || 'N/A'}</span>
            <StatusBadge status={employeeData.status} />
          </div>
          {canEdit ? (
            <button onClick={handleOpenEditModal} className={styles.editButton} aria-label="Edit details">
              <FiEdit2 />
            </button>
          ) : (
            <span className={styles.editButtonDisabled} aria-label="Cannot edit details">
              <FiEdit2 />
            </span>
          )}
        </div>

        <div className={styles.detailsData}>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【出社状況】</span>
            {/* employeeData */}
            <span className={styles.dataValue}>{employeeData.attendance || '未登録'}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【怪我の状況】</span>
            {/*  employeeData */}
            <span className={styles.dataValue}>{employeeData.injury || '未登録'}</span>
          </div>
          <div className={styles.dataRow}>
            <span className={styles.dataLabel}>【登録日時】</span>
            <span className={styles.dataValue}>
              {formatDateTime(employeeData.registrationTime)}
            </span>
          </div>
        </div>

      </div>
    </div>
    <EmployeeEditModal
      isOpen={isEditModalOpen}
      onClose={handleCloseEditModal}
      onSave={handleSaveChanges}
      initialData={employeeData}
    /></>
  );
}

export default EmployeeDetailModal;