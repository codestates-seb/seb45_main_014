import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading.jsx';

const AuthGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    navigate('/');
  }, [navigate]);

  return <LoadingSpinner />;
};

export default AuthGoogle;
