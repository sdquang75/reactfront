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



    const response = await fetch('http://localhost/PHP1/login12.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emp_no: employeeId, password: password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'ERROR');
    }

    else {
      const apiResponseData = await response.json();


      const userDataForApp = {
        emp_no: apiResponseData.emp_no,
        name: apiResponseData.ename,
        role: apiResponseData.role,
        department_no: apiResponseData.DPT_NO,

        department: `${apiResponseData.DPT_NO}`,
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
          navigate('/safetylist', { replace: true });
        }
      }
      // ...
    }
    // API ---





    // try {
    // --- 本番ログインAPIを呼び出す ---
    // const userData = await loginApi(employeeId, password);
    //--------------------------------





    // --- GIẢ LẬP API RESPONSE ĐỂ TEST ---
    // try {
    //   TEST
    // let userData;
    // if (employeeId === '1' && password === '2') {
    //   userData = {
    //     emp_no: employeeId,
    //     name: "Admin",
    //     department: "IT",
    //     role: "admin",

    //   };
    // } else if (employeeId === '3' && password === '4') {
    //   userData = {
    //     emp_no: employeeId,
    //     name: "User",
    //     department: "Sales",
    //     role: "user",

    //   };
    // } else {
    //   throw new Error('社員番号またはパスワードが正しくありません。');
    // }
    // // --- END TEST ---




    //   APIが成功した場合、App.jsでonLoginSuccessコールバックを呼び出し
    // if (typeof onLoginSuccess === 'function') {
    //   onLoginSuccess(userData);
    //  NAVIGATION
    //     if (userData.role === 'admin') {
    //       navigate('/admin');
    //     } else {
    //       navigate('/safetylist');
    //     }
    //   } else {
    //    
    //     // navigate('/some-default-page');
    //   }

    //   }
    // } catch (err) {
    //   console.error('Login failed:', err);

    //   setError(err.message || 'ログイン中にエラーが発生しました。');
    // }
    // --- END API ---
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