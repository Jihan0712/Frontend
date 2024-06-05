import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import './login.css'; // Make sure to import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <div className="login-container">
      <div className="login-content-container">
        <div className="logo">
          <img src="/imgs/Logo.svg" alt="Logo" />
          <div className="logo-text-box">Iot Smoke Belching System</div>
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <h3>Login to your account</h3>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
            />
          </div>
          <button type="submit" disabled={isLoading}>Sign in</button>
          {error && <div className="error">{error}</div>}
          <div className="register-text-box">
            <p>Don't have an account yet? <a href="/signup">Sign up now</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
