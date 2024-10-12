import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = () => {
  const [authType, setAuthType] = useState('signup'); // 'signup', 'loginParent', or 'loginStudent'

  const handleAuthTypeChange = (type) => {
    setAuthType(type);
  };

  return (
    <div className="auth-container">
      <h1>Welcome to Soulace</h1>

      <div className="auth-type-toggle">
        <button
          onClick={() => handleAuthTypeChange('signup')}
          style={{
            backgroundColor: authType === 'signup' ? '#2980b9' : '#3498db'
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => handleAuthTypeChange('loginParent')}
          style={{
            backgroundColor: authType === 'loginParent' ? '#2980b9' : '#3498db'
          }}
        >
          Parent Login
        </button>
        <button
          onClick={() => handleAuthTypeChange('loginStudent')}
          style={{
            backgroundColor: authType === 'loginStudent' ? '#2980b9' : '#3498db'
          }}
        >
          Student Login
        </button>
      </div>

      {authType === 'signup' && (
        <form>
          <h2>Sign Up</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      )}

      {authType === 'loginParent' && (
        <form>
          <h2>Parent Login</h2>
          <input type="email" placeholder="Parent Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <h3>Don't have an account? Sign up now!</h3>
        </form>
      )}

      {authType === 'loginStudent' && (
        <form>
          <h2>Student Login</h2>
          <input type="email" placeholder="Student Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <h3>Don't have an account? Sign up now!</h3>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
