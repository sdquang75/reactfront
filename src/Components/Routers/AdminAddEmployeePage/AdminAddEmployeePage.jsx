import React, { useState, useEffect } from 'react';
import styles from './AdminAddEmployeePage.module.css';

import { useNavigate } from 'react-router-dom';
// Import icons
import { FiEye, FiEyeOff, FiChevronDown, FiArrowLeft } from 'react-icons/fi';


import AddEmployeeConfirmationModal from '../../Morals/AddEmployeeConfirmationModal/AddEmployeeConfirmationModal';


import { MOCK_DEPARTMENTS } from '../../Misc/DATA/data';
import BackButton from '../../Misc/BackButton/BackButton';


function AdminAddEmployeePage() {
    const navigate = useNavigate();

    // State cho các trường trong form
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [supervisorId, setSupervisorId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [dataToConfirm, setDataToConfirm] = useState(null); // Lưu dữ liệu form để hiển thị trên modal





    useEffect(() => {
        //  API 

        setDepartments(['', ...MOCK_DEPARTMENTS]);



    }, []);

    //  submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !department || !password) {
            alert("氏名、所属部署、パスワードは必須入力です。");
            return;
        }

        const newEmployeeData = {
            name,
            department,
            supervisorId: supervisorId || null,
            phoneNumber: phoneNumber || null,
            password,

        };
        setDataToConfirm(newEmployeeData);
        setIsConfirmModalOpen(true);


    }; const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setDataToConfirm(null); // Xóa dữ liệu xác nhận khi đóng
    };
    const handleConfirmRegistration = () => {
        if (!dataToConfirm) return;

        console.log('Confirmed - Registering new employee:', dataToConfirm);
        // --- !!! Logic API  ---
        // Ví dụ: createEmployeeAPI(dataToConfirm).then(response => { ... }).catch(...)

        // Tạm thời: Đóng modal, báo thành công, reset form, quay lại trang trước
        handleCloseConfirmModal(); // Đóng modal
        alert(`新入社員「${dataToConfirm.name}」を登録しました。`);
        // Reset form
        setName('');
        setDepartment('');
        setSupervisorId('');
        setPhoneNumber('');
        setPassword('');
        // Quay lại trang trước
        navigate(-1);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };





    return (
        <div className={styles.page}>

            <BackButton />

            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <h2 className={styles.pageTitle}>新入社員登録</h2>
                    <p className={styles.instructions}>新入社員の情報を入力してください</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Họ tên */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>氏名</label>
                            <input
                                type="text"
                                id="name"
                                className={styles.input}
                                placeholder="氏名を入力"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Phòng ban */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="department" className={styles.label}>所属部署</label>
                            <div className={styles.selectWrapper}>
                                <select
                                    id="department"
                                    className={styles.selectInput}
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                >
                                    {departments.length === 0 ? (
                                        <option value="" disabled>Loading...</option>
                                    ) : (
                                        departments.map((dept, index) => (
                                            // Option đầu tiên có thể là rỗng để yêu cầu chọn
                                            <option key={index} value={dept} disabled={index === 0 && dept === ''}>
                                                {dept === '' ? '部署を選択' : dept}
                                            </option>
                                        ))
                                    )}
                                </select>
                                <FiChevronDown className={styles.selectArrow} />
                            </div>
                        </div>

                        {/* Mã số cấp trên */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="supervisorId" className={styles.label}>上司番号</label>
                            <input
                                type="text"
                                id="supervisorId"
                                className={styles.input}
                                placeholder="上司の社員番号を入力"
                                value={supervisorId}
                                onChange={(e) => setSupervisorId(e.target.value)}
                            // Không bắt buộc nhập
                            />
                        </div>

                        {/* Số điện thoại */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="phoneNumber" className={styles.label}>電話番号</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                className={styles.input}
                                placeholder="電話番号を入力"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            // Không bắt buộc nhập
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div className={`${styles.inputGroup} ${styles.passwordWrapper}`}>
                            <label htmlFor="password" className={styles.label}>パスワード</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className={styles.input}
                                placeholder="パスワードを入力"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            // Thêm các ràng buộc mật khẩu nếu cần (minLength, pattern)
                            />
                            {password.length > 0 && (<button
                                type="button" // Quan trọng
                                onClick={togglePasswordVisibility}
                                className={styles.passwordToggle}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >

                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>)}
                        </div>


                        <button type="submit" className={styles.submitButton}>
                            登録
                        </button>
                    </form>
                </div>
            </main>
            <AddEmployeeConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmModal}
                onConfirm={handleConfirmRegistration} //  API
                data={dataToConfirm} // Truyền dữ liệu đã nhập
            />
        </div>
    );
}

export default AdminAddEmployeePage;