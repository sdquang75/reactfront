import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginPage({ onLoginSuccess }) {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/PHP1/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emp_no: employeeId, password: password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
       
        if (response.status === 401) {
          setError('社員番号またはパスワードが正しくありません。'); 
        } else {
          setError(responseData.error || `エラーが発生しました: ${response.status}`);
        }
        setIsLoading(false); 
        return; 
      }

      // responseData is { emp_no: "...", ename: "...", DPT_NO: "...", role: "..." }
      const userDataForApp = {
        emp_no: responseData.emp_no,
        name: responseData.ename,
        ename: responseData.ename,
        role: responseData.role,
        DPT_NO: responseData.DPT_NO,
        dpt_no: responseData.DPT_NO,
        department: ` ${responseData.DPT_NO}`,
        status: "unknown",
        commute: "unknown",
        injury: "unknown",
        timestamp: new Date().toISOString(),
      };

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(userDataForApp);
        // // NAVIGATION 
        // if (userDataForApp.role === 'admin') {
        //   navigate('/admin', { replace: true });
        // } else {
        //   navigate('/safety', { replace: true } );
        // }
      } else {
        console.error("onLoginSuccess error: onLoginSuccess is not a function");
        setError('ログイン処理中にエラーが発生しました。');
      }

    } catch (err) {
      console.error('Login request failed:', err);
     
      if (err instanceof TypeError && err.message === "Failed to fetch") {
         setError('サーバーへの接続に失敗しました。ネットワークを確認してください。'); 
      } else if (!error) { 
         setError(err.message || 'ログイン中に不明なエラーが発生しました。'); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.mainContent}>
        <h2 className={styles.pageTitle}>ログイン画面</h2>
        <div className={styles.formContainer}>
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
                autoComplete="username"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                パスワード
              </label>
              <div className={styles.passwordWrapper}> 
                <input
                  type={showPassword ? 'password' : 'text'}
                  id="password"
                  className={styles.input}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.passwordToggle}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                )}
              </div>
            </div>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </button>
             {error && <p className={styles.errorMessage}>{error}</p>} 
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;