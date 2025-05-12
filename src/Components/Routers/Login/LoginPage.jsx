import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { loginApi } from './path/to/your/apiService';

function LoginPage({ onLoginSuccess }) {
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
  // Login

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);


    try { 
      const response = await fetch('http://localhost/PHP1/login12.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emp_no: employeeId, password: password }),
      });

     
      const responseData = await response.json(); 

      if (!response.ok) {
        
        throw new Error(responseData.error || `HTTP: ${response.status}`);
      }

      
      // responseData is { emp_no: "...", ename: "...", DPT_NO: "...", role: "..." }

      const userDataForApp = {
        emp_no: responseData.emp_no,
        name: responseData.ename, 
        role: responseData.role,
       
        department: ` ${responseData.DPT_NO}`,
        status: "unknown",
        commute: "unknown",
        injury: "unknown",
        timestamp: new Date().toISOString(),
      };

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(userDataForApp);
        // NAVIGATION
        if (userDataForApp.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/safety', { replace: true });
        }
      } else {
        console.error("onLoginSuccess error");
       
      }

    } catch (err) {
      console.error('Login request failed:', err);
      setError(err.message || 'ERROR.');
    } finally { 
      setIsLoading(false); 
    }
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
              </button>)}

            </div>
            {/* <Link to="/safety">
            */}<button type="submit" className={styles.button}>
              ログイン
            </button>{/* </Link> */}
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;