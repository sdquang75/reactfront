import React from 'react'

const Login = () => {}
const handleChange = (e) => {

  return (
    <div>
    <div className='login-page'>
      <h1>ログイン画面</h1>
      <div className='login-container'>
        <div className='form-group'>
        <label htmlFor="email">社員番号</label>
        <input
              type="loginemail"
              id="email"
              name="email"
              placeholder="example@domain.com"
              value={formData.email}
              // onChange={handleChange}
              required
            />
        </div>
        <div className='form-group'>
          <label htmlFor="password">パスワード</label>
          <input
                type="loginpassword"
                id="password"
                name="password"
                placeholder="パスワード"
                value={formData.password}
                // onChange={handleChange}
                required
              />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
