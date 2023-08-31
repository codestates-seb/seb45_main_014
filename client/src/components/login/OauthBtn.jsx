import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { ImManWoman } from 'react-icons/im';

const OauthBtn = ({ bgColor, color, icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '40px',
        borderRadius: '8px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)',
        margin: '10px 0px',
        backgroundColor: bgColor,
        color: color,
        fontWeight: 'bold',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '15px',
        }}
      >
        {icon}
      </div>
      {text}
    </button>
  );
};

export const GoogleBtn = () => {
  const googleSocialLogin = () => {
    window.location.href = 'http://.../oauth2/authorization/google';
  };

  return (
    <OauthBtn
      bgColor="#f6f6f2"
      color="#2e2e2e"
      onClick={googleSocialLogin}
      icon={<FcGoogle className="googleicon" />}
      text="구글 계정으로 로그인하기"
    />
  );
};

export const KakaoBtn = () => {
  const kakaoSocialLogin = () => {
    window.location.href = 'http://.../oauth2/authorization/kakao';
  };

  return (
    <OauthBtn
      bgColor="#ffe812"
      color="#2e2e2e"
      onClick={kakaoSocialLogin}
      icon={<RiKakaoTalkFill className="kakaoicon" />}
      text="카카오 계정으로 로그인하기"
    />
  );
};

export const GuestBtn = () => {
  const guestLogin = () => {
    window.location.href = 'http://.../oauth2/authorization/guest';
  };

  return (
    <OauthBtn
      bgColor="#2e2e2e"
      color="#f6f6f2"
      onClick={guestLogin}
      icon={<ImManWoman />}
      text="게스트 계정으로 로그인하기"
    />
  );
};
