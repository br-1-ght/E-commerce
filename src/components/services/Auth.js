import React from 'react';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegistrationForm';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = React.useState(true);

  const initializeUsers = () => {
    try {
      const storedUsers = localStorage.getItem('mockUsers');
      if (storedUsers) {
        return JSON.parse(storedUsers);
      }
      localStorage.setItem('mockUsers', JSON.stringify([]));
      return [];
    } catch (error) {
      console.error("Error initializing users:", error);
      return [];
    }
  };

  const [mockUsers, setMockUsers] = React.useState(initializeUsers());

  React.useEffect(() => {
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }, [mockUsers]);

  const loginUser = async (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  };

  const registerUser = async (userData) => {
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Math.max(0, ...mockUsers.map(u => u.id)) + 1,
      ...userData
    };

    const updatedUsers = [...mockUsers, newUser];
    setMockUsers(updatedUsers);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    return newUser;
  };

  const handleLogin = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      // Pass false for isNewUser since this is a login
      onLogin(user, false);
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const user = await registerUser(userData);
      // Pass true for isNewUser since this is a new registration
      onLogin(user, true);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitchToRegister={() => setIsLogin(false)} 
        />
      ) : (
        <RegisterForm 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setIsLogin(true)} 
        />
      )}
    </div>
  );
};

export default Auth;