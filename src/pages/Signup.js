import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, confirmPassword);
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src="/imgs/Logo.svg" alt="Logo" />
        <div className="logo-text-box">Iot Smoke Belching System</div>
      </div>
      <form className="login-content-container" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
        <label>Confirm Password:</label>
        <input 
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword} 
        />

        <button type="submit" disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
