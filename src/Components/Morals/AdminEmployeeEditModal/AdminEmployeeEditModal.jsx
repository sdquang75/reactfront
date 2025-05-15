
import React, { useState, useEffect } from 'react';
import styles from './AdminEmployeeEditModal.module.css'; // Tạo file CSS này
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';


function AdminEmployeeEditModal({
  isOpen,
  onClose,
  onSave, 
  employeeData, 
  departments,
  allEmployees, 
  currentUser 
}) {
  const [formData, setFormData] = useState({
    ename: '',
    dpt_no: '',
    mgr_no: '',
    tel: '',
    password: '',
    position: '',
    emp_no: '',
  });
  const [showpassword, setShowpassword] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (isOpen && employeeData) {
console.log('AdminEditModal - employeeData received:', JSON.stringify(employeeData, null, 2)); 

      setFormData({
        emp_no: employeeData.emp_no || '', 
        ename: employeeData.ename || '',
        dpt_no: employeeData.dpt_no || '',
        mgr_no: employeeData.mgr_no || '',
        tel: employeeData.tel || '',
        password: '', 
        position: employeeData.position || '一般', 
      });
      setShowpassword(false); 
      setApiError(''); 
    }
  }, [isOpen, employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowpassword = () => setShowpassword(!showpassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    
    const payload = { ...formData };
    if (!payload.password) {
      delete payload.password; 
    }

    console.log("Admin submitting employee update:", payload);

   
    try {
      const response = await fetch('http://localhost/PHP1/admin_update_employee.php', { 
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
     
  console.log('AdminEditModal - Response status:', response.status);
  const responseText = await response.text(); 
  console.log('AdminEditModal - Response text:', responseText);

  const result = JSON.parse(responseText);
  console.log('AdminEditModal - Parsed API Result:', result);

  if (!response.ok || result.error) {
    throw new Error(result.message || result.error || `API Error: ${response.status} - ${responseText}`);
  }
  //   alert('社員情報が正常に更新されました。');
  onSave(result.updatedEmployeeData || payload);
  onClose();
} catch (error) {
  console.error("AdminEditModal - Failed to update employee by admin:", error);
  setApiError(error.message || '更新中にエラーが発生しました。');
}
  };

  if (!isOpen) return null;

  // Lọc  nhân viên hiện tại 
  const potentialManagers = allEmployees.filter(emp => String(emp.emp_no) !== String(formData.emp_no));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close edit dialog"><FiX /></button>
        <h2 className={styles.title}>社員情報の編集 (管理者)</h2>
        {apiError && <p className={styles.errorMessage}>{apiError}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Mã Nhân Viên */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-empNo" className={styles.label}>社員番号</label>
            <input type="text" id="adminEdit-empNo" name="emp_no" value={formData.emp_no} className={styles.input} readOnly disabled />
          </div>

          {/* Tên Nhân Viên */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-ename" className={styles.label}>氏名</label>
            <input type="text" id="adminEdit-ename" name="ename" value={formData.ename} onChange={handleChange} className={styles.input} required />
          </div>

          {/* Phòng Ban */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-dptNo" className={styles.label}>所属部署</label>
            <select id="adminEdit-dptNo" name="dpt_no" value={formData.dpt_no} onChange={handleChange} className={styles.select} required>
              <option value="">部署を選択</option>
              {departments && departments.map(dept => (
                // departments là  dpt_no, dpname ,
                
                dept.dpt_no !== 'all' && <option key={dept.dpt_no} value={dept.dpt_no}>{dept.dpname}</option>
              ))}
            </select>
          </div>

          {/* Người Quản Lý */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-mgrNo" className={styles.label}>上司</label>
            <select id="adminEdit-mgrNo" name="mgr_no" value={formData.mgr_no} onChange={handleChange} className={styles.select} required>
              <option value="">上司を選択</option>
              {potentialManagers && potentialManagers.map(emp => (
                 // allEmployees là  emp_no, ename
                <option key={emp.emp_no} value={emp.emp_no}>{emp.ename} (ID: {emp.emp_no})</option>
              ))}
            </select>
          </div>

          {/* Chức Vụ */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-position" className={styles.label}>役職</label>
            <input type="text" id="adminEdit-position" name="position" value={formData.position} onChange={handleChange} className={styles.input} />
          </div>

          {/* Số Điện Thoại */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-tel" className={styles.label}>電話番号</label>
            <input type="tel" id="adminEdit-tel" name="tel" value={formData.tel} onChange={handleChange} className={styles.input} required />
          </div>

          {/* Mật khẩu */}
          <div className={styles.inputGroup}>
            <label htmlFor="adminEdit-password" className={styles.label}>新しいパスワード (変更する場合のみ)</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showpassword ? 'text' : 'password'}
                id="adminEdit-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="変更する場合のみ入力"
                autoComplete="new-password"
              />
              <button type="button" onClick={toggleShowpassword} className={styles.passwordToggle}>
                {showpassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>変更を保存</button>
            {/* <button type="button" onClick={onClose} className={styles.cancelButton}>キャンセル</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminEmployeeEditModal;