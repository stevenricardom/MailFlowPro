import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MailFlowPro } from './components/MailFlowPro';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <MailFlowPro userEmail={userEmail} onLogout={handleLogout} />;
}
