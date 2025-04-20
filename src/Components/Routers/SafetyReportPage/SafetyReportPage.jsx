import React, { useState } from 'react';
import styles from './SafetyReportPage.module.css';
import ConfirmationModal from './ConfirmationModal'; 

function SafetyReportPage({ onLogout }) {
  const [safetyStatus, setSafetyStatus] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [injuryStatus, setInjuryStatus] = useState('');

  // State  modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRadioChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Open moral
  const handleOpenConfirmation = (event) => {
    event.preventDefault();
    // check radio
    if (safetyStatus && attendanceStatus && injuryStatus) {
        setIsModalOpen(true); // Open Moral
    } else {
      
    }
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Hàm xử lý submit 
  const handleConfirmSubmit = () => {
    
    // Logic  API koko 

    //  đóng modal
    setIsModalOpen(false);
   
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>安否確認システム</h1>
        <button onClick={onLogout} className={styles.logoutButton}>
          ログアウト
        </button>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>安否登録</h2>
          <p className={styles.subtitle}>
            安否情報を選択してください
          </p>

          
          <form onSubmit={handleOpenConfirmation} className={styles.form}>
            {/* Thay đổi onSubmit thành handleOpenConfirmation */}
          {/* <form onSubmit={onSubmit} className={styles.form}> */}
        



             {/* --- Nhóm Tình trạng An toàn --- */}
            <fieldset className={styles.radioGroup}>
              <legend className={styles.groupLabel}>安否状況</legend>
              <div className={styles.radioOptionsContainer}>
                <div className={styles.radioOption}>
                  <input type="radio" id="statusSafe" name="safetyStatus" value="安全" checked={safetyStatus === '安全'} onChange={handleRadioChange(setSafetyStatus)} className={styles.radioInput} required/>
                  <label htmlFor="statusSafe" className={styles.radioLabel}>安全</label>
                </div>
                <div className={styles.radioOption}>
                  <input type="radio" id="statusDanger" name="safetyStatus" value="危険" checked={safetyStatus === '危険'} onChange={handleRadioChange(setSafetyStatus)} className={styles.radioInput} required/>
                  <label htmlFor="statusDanger" className={styles.radioLabel}>危険</label>
                </div>
              </div>
            </fieldset>

            {/* --- Nhóm Tình trạng Đi làm --- */}
            <fieldset className={styles.radioGroup}>
              <legend className={styles.groupLabel}>出社状況</legend>
              <div className={styles.radioOptionsContainer}>
                <div className={styles.radioOption}>
                  <input type="radio" id="attendancePossible" name="attendanceStatus" value="出社可能" checked={attendanceStatus === '出社可能'} onChange={handleRadioChange(setAttendanceStatus)} className={styles.radioInput} required/>
                  <label htmlFor="attendancePossible" className={styles.radioLabel}>出社可能</label>
                </div>
                <div className={styles.radioOption}>
                  <input type="radio" id="attendanceImpossible" name="attendanceStatus" value="出社不可能" checked={attendanceStatus === '出社不可能'} onChange={handleRadioChange(setAttendanceStatus)} className={styles.radioInput} required/>
                  <label htmlFor="attendanceImpossible" className={styles.radioLabel}>出社不可能</label>
                </div>
              </div>
            </fieldset>

            {/* --- Nhóm Tình trạng Thương tích --- */}
            <fieldset className={styles.radioGroup}>
              <legend className={styles.groupLabel}>怪我の状況</legend>
              <div className={styles.radioOptionsContainer}>
                <div className={styles.radioOption}>
                  <input type="radio" id="injuryNone" name="injuryStatus" value="怪我はない" checked={injuryStatus === '怪我はない'} onChange={handleRadioChange(setInjuryStatus)} className={styles.radioInput} required/>
                  <label htmlFor="injuryNone" className={styles.radioLabel}>怪我はない</label>
                </div>
                <div className={styles.radioOption}>
                  <input type="radio" id="injuryMinor" name="injuryStatus" value="軽傷" checked={injuryStatus === '軽傷'} onChange={handleRadioChange(setInjuryStatus)} className={styles.radioInput} required/>
                  <label htmlFor="injuryMinor" className={styles.radioLabel}>軽傷</label>
                </div>
                <div className={styles.radioOption}>
                  <input type="radio" id="injurySerious" name="injuryStatus" value="重傷" checked={injuryStatus === '重傷'} onChange={handleRadioChange(setInjuryStatus)} className={styles.radioInput} required/>
                  <label htmlFor="injurySerious" className={styles.radioLabel}>重傷</label>
                </div>
              </div>
            </fieldset>

            <button type="submit" className={styles.submitButton}>

            {/* <button type="submit" className={styles.onSubmit}> */}
              登録 
            </button>
          </form>
        </div>
      </main>

      {/* Render Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSubmit}
        data={{ safetyStatus, attendanceStatus, injuryStatus }}
      />
    </div>
  );
}

export default SafetyReportPage;