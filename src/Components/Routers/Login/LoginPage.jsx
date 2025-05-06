import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';


function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  

    // On/off password
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };







  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); 
    setIsLoading(true); 
    
       // API ---

    
    // try {
    //   // Giả sử API trả về thông tin user nếu thành công
    //   // const userData = await loginApi(employeeId, password);

    //   // --- Giả lập thành công ---
    //   let userData;
    //   if (employeeId === 'admin' && password === 'adminpass') {
    //     userData = { name: 'Admin User', employeeId: employeeId, role: 'admin' };
    //   } else if (employeeId === 'user' && password === 'userpass') {
    //     userData = { name: 'Normal User', employeeId: employeeId, role: 'user' };
    //   } else {
    //     // --- Giả lập thất bại ---
    //     throw new Error('社員番号またはパスワードが正しくありません。'); // ID hoặc mật khẩu không đúng
    //   }

    //   // Nếu API thành công, gọi callback onLoginSuccess ở App.js
    //   if (typeof onLoginSuccess === 'function') {
    //     onLoginSuccess(userData);
    //     // Chuyển hướng dựa vào role (logic này có thể đặt ở App.js hoặc ở đây)
    //     if (userData.role === 'admin') {
    //       navigate('/admin');
    //     } else {
    //       navigate('/safetylist'); // Hoặc trang user mặc định
    //     }
    //   } else {
    //     console.error("onLoginSuccess is not a function. Cannot update App state.");
    //     // Có thể chuyển hướng tạm thời ở đây nếu cần
    //     // navigate('/some-default-page');
    //   }

    // } catch (err) {
    //   console.error('Login failed:', err);
    //   // Hiển thị lỗi cho người dùng
    //   setError(err.message || 'ログイン中にエラーが発生しました。'); // Có lỗi xảy ra khi đăng nhập
    // }
    // --- KẾT THÚC PHẦN TODO API ---
  };

  return (
    <div className={styles.page}>
    

      <main className={styles.mainContent}>
        {/* Title o ben ngoai con */}
        <h2 className={styles.pageTitle}>ログイン画面</h2> {/* Login Screen */}

        <div className={styles.formContainer}>
          {/* Bỏ subtitle hoặc ẩn nó bằng CSS */}
          <p className={styles.pageTitlemobile}>ログイン</p>
          <p className={styles.subtitle}> 社員番号とパスワードを入力してください </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="employeeId" className={styles.label}>
                社員番号
              </label>
              <input
                type="text"
                id="employeeId"
                className={styles.input}
                placeholder=""
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                パスワード
              </label>
              <input
                 type={showPassword ? 'password' : 'text'}
                id="password"
                className={styles.input}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                
              />  {password.length > 0 && (<button
              type="button" // Quan trọng
              onClick={togglePasswordVisibility}
              className={styles.passwordToggle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {/* Hiển thị icon tương ứng */}
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>  )}
              
            </div>
            <Link to="/safety">
              <button type="submit" className={styles.button}>
                ログイン
              </button></Link>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;