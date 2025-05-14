import React, { useState, useEffect } from 'react';
import styles from './EmployeeEditModal.module.css';
import { FiX } from 'react-icons/fi';

function EmployeeEditModal({ isOpen, onClose, onSave, initialData }) {
  // --- State nội bộ cho các giá trị đang được sửa ---

  const [currentStatus, setcurrentStatus] = useState('');
  const [currentCommute, setcurrentCommute] = useState('');
  const [currentInjury, setcurrentInjury] = useState('');

  // --- khi modal mở ---
  useEffect(() => {

    if (isOpen && initialData) {
      setcurrentStatus(initialData.status || '');
      setcurrentCommute(initialData.commute || '');
      setcurrentInjury(initialData.injury || '');
    }

  }, [isOpen, initialData]);


  const handleRadioChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // ---  Lưu ---
  const handleSubmit = (event) => {
    event.preventDefault();


    const updatedData = {
      status: currentStatus,
      commute: currentCommute,
      injury: currentInjury,
    };
    console.log("EmployeeEditModal handleSubmit, updatedData:", updatedData);
    onSave(updatedData);

  };


  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close edit dialog">
          <FiX />
        </button>

        {/* ///////////////////////////////////////////// */}
        <h2 className={styles.title}>安否情報の編集</h2>
        <p className={styles.instructions}>安否情報を選択してください</p>

        {/* ///////////////////////////////////////////// */}
        <form onSubmit={handleSubmit} className={styles.form}>




          {/* ///////////////////////////////////////////// */}
          {/* --- Nhóm Tình trạng An toàn --- */}

          <fieldset className={styles.radioGroup}>
            <legend className={styles.groupLabel}>安否状況</legend>
            <div className={styles.radioOptionsContainer}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-statusSafe"
                  name="editSafetyStatus"
                  value="安全"
                  checked={currentStatus === '安全'}
                  onChange={handleRadioChange(setcurrentStatus)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-statusSafe" className={styles.radioLabel}>安全</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-statusDanger"
                  name="editSafetyStatus"
                  value="危険"
                  checked={currentStatus === '危険'}
                  onChange={handleRadioChange(setcurrentStatus)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-statusDanger" className={styles.radioLabel}>危険</label>
              </div>
            </div>
          </fieldset>

          {/* ///////////////////////////////////////////// */}
          {/* --- Nhóm Tình trạng Đi làm --- */}
          <fieldset className={styles.radioGroup}>
            <legend className={styles.groupLabel}>出社状況</legend>
            <div className={styles.radioOptionsContainer}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-attendancePossible"
                  name="editAttendanceStatus"
                  value="出社可能"
                  checked={currentCommute === '出社可能'}
                  onChange={handleRadioChange(setcurrentCommute)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-attendancePossible" className={styles.radioLabel}>出社可能</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-attendanceImpossible"
                  name="editAttendanceStatus"
                  value="出社不可能"
                  checked={currentCommute === '出社不可能'}
                  onChange={handleRadioChange(setcurrentCommute)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-attendanceImpossible" className={styles.radioLabel}>出社不可能</label>
              </div>
            </div>
          </fieldset>




          {/* ///////////////////////////////////////////// */}
          {/* --- Nhóm Tình trạng Thương tích --- */}
          <fieldset className={styles.radioGroup}>
            <legend className={styles.groupLabel}>怪我の状況</legend>
            <div className={styles.radioOptionsContainer}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-injuryNone"
                  name="editInjuryStatus"
                  value="怪我はない"
                  checked={currentInjury === '怪我はない'}
                  onChange={handleRadioChange(setcurrentInjury)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-injuryNone" className={styles.radioLabel}>怪我はない</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-injuryMinor"
                  name="editInjuryStatus"
                  value="軽傷"
                  checked={currentInjury === '軽傷'}
                  onChange={handleRadioChange(setcurrentInjury)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-injuryMinor" className={styles.radioLabel}>軽傷</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="edit-injurySerious"
                  name="editInjuryStatus"
                  value="重傷"
                  checked={currentInjury === '重傷'}
                  onChange={handleRadioChange(setcurrentInjury)}
                  className={styles.radioInput}
                  required
                />
                <label htmlFor="edit-injurySerious" className={styles.radioLabel}>重傷</label>
              </div>
            </div>
          </fieldset>





          {/* ///////////////////////////////////////////// */}
          {/* Nút Lưu */}
          <button type="submit" className={styles.saveButton}>
            保存
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeEditModal;