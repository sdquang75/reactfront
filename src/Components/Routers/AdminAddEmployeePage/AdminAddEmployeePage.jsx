// AdminAddEmployeePage.jsx
import React, { useState, useEffect } from 'react';
import styles from './AdminAddEmployeePage.module.css';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi';
import AddEmployeeConfirmationModal from '../../Morals/AddEmployeeConfirmationModal/AddEmployeeConfirmationModal';
import BackButton from '../../Misc/BackButton/BackButton';

function AdminAddEmployeePage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        dpt_no: '',
        position: '一般',
        mgr_no: '', 
        tel: '',
        password: '',
    });

    const [departments, setDepartments] = useState([{ value: '', label: '部署を選択' }]); // Khởi tạo với option mặc định
    const [allEmployees, setAllEmployees] = useState([{ value: '', label: '上司を選択' }]); // Khởi tạo với option mặc định

    const [showPassword, setShowPassword] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [dataToConfirm, setDataToConfirm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchDataForDropdowns = async () => {
            setIsLoading(true);
            try {
                // API này cần trả về { employees: [{emp_no, name/ename,...}], departments: [{dpt_no, department_name,...}] }
                // với key chữ thường
                const response = await fetch('http://localhost/PHP1/get_all_employees_details.php'); 
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (data.error) throw new Error(data.error.message || data.error);

                const deptOptions = (data.departments || [])
                    .filter(dept => dept.dpt_no !== 'all')
                    .map(dept => ({
                        value: String(dept.dpt_no),
                        label: dept.dpname
                    }));
                setDepartments([{ value: '', label: '部署を選択' }, ...deptOptions]);

                const empOptions = (data.employees || []).map(emp => ({
                    value: String(emp.emp_no),
                   
                    label: `${emp.name || emp.ename} (ID: ${emp.emp_no})`
                }));
                // Thêm option "Không có quản lý" với value là '0' 
                setAllEmployees([{ value: '', label: '上司を選択' }, { value: '0', label: 'なし (直属の上司なし)' }, ...empOptions]);

            } catch (error) {
                console.error("Failed to fetch data for dropdowns:", error);
                setApiMessage({ type: 'error', text: `ドロップダウンデータの読み込みに失敗しました: ${error.message}` });
                setDepartments([{ value: '', label: '部署の読み込み失敗' }]);
                setAllEmployees([{ value: '', label: '上司の読み込み失敗' }]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDataForDropdowns();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setApiMessage({ type: '', text: '' });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setApiMessage({ type: '', text: '' });
        if (!formData.name || !formData.dpt_no || !formData.password || !formData.position || !formData.tel) {
            setApiMessage({ type: 'error', text: "氏名、所属部署、役職、電話番号、パスワードは必須入力です。" });
            return;
        }
        if (formData.mgr_no && isNaN(parseInt(formData.mgr_no))) {
             setApiMessage({ type: 'error', text: "上司番号は数字で入力してください。"});
             return;
        }

        const selectedDeptObj = departments.find(d => d.value === formData.dpt_no);
        const selectedMgrObj = allEmployees.find(e => e.value === formData.mgr_no);

        const dataForConfirmation = {
           
            name: formData.name,
            dpt_no: formData.dpt_no,  
            position: formData.position,
            mgr_no: formData.mgr_no,     
            tel: formData.tel,
            password: formData.password, 
            
            departmentName: selectedDeptObj ? selectedDeptObj.label : formData.dpt_no,
            managerName: selectedMgrObj ? selectedMgrObj.label : (formData.mgr_no === '0' || !formData.mgr_no ? 'なし' : formData.mgr_no),
        };

        setDataToConfirm(dataForConfirmation);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setDataToConfirm(null);
    };

    const handleConfirmRegistration = async () => {
        if (!dataToConfirm) return;
        setIsLoading(true);
        setApiMessage({ type: '', text: '' });
        setIsConfirmModalOpen(false);

        const payload = { 
            name: dataToConfirm.name,
            dpt_no: dataToConfirm.dpt_no,
            position: dataToConfirm.position,
            mgr_no: dataToConfirm.mgr_no || '0', // Gửi '0' nếu không chọn, API PHP sẽ xử lý
            tel: dataToConfirm.tel,
            password: dataToConfirm.password,
        };
        console.log('Submitting new employee to API:', payload);

        try {
            const response = await fetch('http://localhost/PHP1/add_employee.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (!response.ok || result.error === true) { 
                throw new Error(result.message || '社員情報の登録に失敗しました。');
            }

            setApiMessage({ type: 'success', text: result.message || `新入社員「${dataToConfirm.name}」を登録しました。` });
            alert(result.message || `新入社員「${dataToConfirm.name}」を登録しました。`);
            setFormData({ name: '', dpt_no: '', position: '一般', mgr_no: '', tel: '', password: '' });
            // navigate(-1); 
        } catch (error) {
            console.error("Failed to register new employee:", error);
            setApiMessage({ type: 'error', text: error.message || '登録処理中に予期せぬエラーが発生しました。' });
        } finally {
            setIsLoading(false);
            setDataToConfirm(null);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className={styles.page}>
            {/* <BackButton /> */}
            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <h2 className={styles.pageTitle}>新入社員登録</h2>
                    <p className={styles.instructions}>新入社員の情報を入力してください</p>
                    {/* {apiMessage.text && (
                        <div className={`${styles.apiMessage} ${apiMessage.type === 'error' ? styles.error : styles.success}`}>
                            {apiMessage.text}
                        </div>
                    )} */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>氏名</label>
                            <input type="text" id="name" name="name" className={styles.input}
                                placeholder="氏名を入力" value={formData.name}
                                onChange={handleChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="dpt_no" className={styles.label}>所属部署</label>
                            <div className={styles.selectWrapper}>
                                <select id="dpt_no" name="dpt_no" className={styles.selectInput}
                                    value={formData.dpt_no} onChange={handleChange} required disabled={isLoading && departments.length <= 1}>
                                    {departments.map((dept) => (
                                        <option key={dept.value} value={dept.value} disabled={dept.value === ''}>
                                            {dept.label}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className={styles.selectArrow} />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="position" className={styles.label}>役職</label>
                            <input type="text" id="position" name="position" className={styles.input}
                                placeholder="役職 (例: 一般, 課長)" value={formData.position}
                                onChange={handleChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="mgr_no" className={styles.label}>上司番号</label>
                            <div className={styles.selectWrapper}>
                                <select id="mgr_no" name="mgr_no" className={styles.selectInput}
                                    value={formData.mgr_no} onChange={handleChange} disabled={isLoading && allEmployees.length <= 1}>
                                    {allEmployees.map((emp) => (
                                        <option key={emp.value} value={emp.value} disabled={emp.value === ''}>
                                            {emp.label}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className={styles.selectArrow} />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="tel" className={styles.label}>電話番号</label>
                            <input type="tel" id="tel" name="tel" className={styles.input}
                                placeholder="電話番号を入力" value={formData.tel}
                                onChange={handleChange} required />
                        </div>
                        <div className={`${styles.inputGroup} ${styles.passwordWrapper}`}>
                            <label htmlFor="password" className={styles.label}>パスワード</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password"
                                className={styles.input} placeholder="パスワードを入力"
                                value={formData.password} onChange={handleChange} required />
                            {/* {formData.password.length > 0 && (
                                <button type="button" onClick={togglePasswordVisibility}
                                    className={styles.passwordToggle}
                                    aria-label={showPassword ? "Hide Password" : "Show Password"}>
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            )} */}
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={isLoading}>
                            {isLoading ? '処理中...' : '確認画面へ'}
                        </button>
                    </form>
                </div>
            </main>
            <AddEmployeeConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmModal}
                onConfirm={handleConfirmRegistration}
                data={dataToConfirm}
            />
        </div>
    );
}
export default AdminAddEmployeePage;