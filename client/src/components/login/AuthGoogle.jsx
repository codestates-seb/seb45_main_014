import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading.jsx';
import { useAuthStore } from '../../store/store';
import { toast } from 'react-hot-toast';

const AuthGoogle = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);
    }

    navigate('/');

    toast.success('로그인 되었습니다.');
  }, [login, navigate]);

  return <LoadingSpinner />;
};

export default AuthGoogle;
