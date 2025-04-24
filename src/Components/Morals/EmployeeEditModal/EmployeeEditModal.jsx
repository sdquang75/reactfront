import React, { useState, useEffect } from 'react';
import styles from './EmployeeEditModal.module.css'; // 
import { FiX } from 'react-icons/fi'; // 

function EmployeeEditModal({ isOpen, onClose, onSave, initialData }) {
  // --- State nội bộ cho các giá trị đang được sửa ---
  // Khởi tạo state từ initialData được truyền vào
  const [currentSafetyStatus, setCurrentSafetyStatus] = useState('');
  const [currentAttendanceStatus, setCurrentAttendanceStatus] = useState('');
  const [currentInjuryStatus, setCurrentInjuryStatus] = useState('');

  // --- useEffect để cập nhật state nội bộ khi initialData thay đổi (khi modal mở) ---
  useEffect(() => {
    // Chỉ cập nhật khi modal được mở và có initialData
    if (isOpen && initialData) {
      setCurrentSafetyStatus(initialData.safetyStatus || ''); // Dùng key nội bộ
      setCurrentAttendanceStatus(initialData.attendanceStatus || '');
      setCurrentInjuryStatus(initialData.injuryStatus || '');
    }
    // Không reset state khi đóng (isOpen=false) để giữ giá trị nếu mở lại nhanh
    // Nếu muốn reset, thêm điều kiện if (!isOpen) { ...reset state... }
  }, [isOpen, initialData]); // Chạy lại khi isOpen hoặc initialData thay đổi

  // --- Hàm xử lý thay đổi Radio Button ---
  const handleRadioChange = (setter) => (event) => {
    setter(event.target.value); // Cập nhật state nội bộ của modal
  };

  // --- Hàm xử lý khi nhấn nút Lưu ---
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn submit form mặc định

    // Tạo object chứa dữ liệu đã sửa đổi
    const updatedData = {
      safetyStatus: currentSafetyStatus,
      attendanceStatus: currentAttendanceStatus,
      injuryStatus: currentInjuryStatus,
    };

    // Gọi hàm onSave được truyền từ component cha, kèm theo dữ liệu mới
    console.log("Saving edited data:", updatedData);
    onSave(updatedData); // Hàm này sẽ xử lý việc gọi API và cập nhật state ở component cha

    // onClose(); // Component cha sẽ quyết định có đóng modal sau khi lưu hay không
    // thường là có, nên có thể gọi onClose() trong hàm onSave ở component cha
  };

  // Không render gì nếu modal không mở
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
                  id="edit-statusSafe" // Id cần khác với trang report gốc
                  name="editSafetyStatus" // Name cần khác
                  value="safe" // Dùng key nội bộ
                  checked={currentSafetyStatus === 'safe'} // So sánh với state nội bộ
                  onChange={handleRadioChange(setCurrentSafetyStatus)} // Cập nhật state nội bộ
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
                  value="danger"
                  checked={currentSafetyStatus === 'danger'}
                  onChange={handleRadioChange(setCurrentSafetyStatus)}
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
                  value="possible"
                  checked={currentAttendanceStatus === 'possible'}
                  onChange={handleRadioChange(setCurrentAttendanceStatus)}
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
                  value="impossible"
                  checked={currentAttendanceStatus === 'impossible'}
                  onChange={handleRadioChange(setCurrentAttendanceStatus)}
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
                  value="none"
                  checked={currentInjuryStatus === 'none'}
                  onChange={handleRadioChange(setCurrentInjuryStatus)}
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
                  value="minor"
                  checked={currentInjuryStatus === 'minor'}
                  onChange={handleRadioChange(setCurrentInjuryStatus)}
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
                  value="serious"
                  checked={currentInjuryStatus === 'serious'}
                  onChange={handleRadioChange(setCurrentInjuryStatus)}
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