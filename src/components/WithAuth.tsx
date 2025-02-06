// src/components/withAuth.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const isUserLoggedIn = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token; // 如果存在令牌，则返回 true，否则返回 false
};

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth: React.FC = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isUserLoggedIn()) { // 检查用户是否已登录
        navigate('/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
