import { GoogleBtn, GuestBtn, KakaoBtn } from './OauthBtn.jsx';
import { styled } from 'styled-components';

const LoginModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  border: 1px solid #debe8f;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 15px;
  background: none;
  border: none;
  font-size: 4em;
  cursor: pointer;
`;

const Login = ({ onClose }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <LoginModal>
        <CloseButton onClick={onClose}>×</CloseButton>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1>로그인</h1>
            <div>로그인 하면 더 많은 정보를 얻을 수 있어요!</div>
          </div>
          <section className="rounded-lg mt-5">
            <div>
              <GoogleBtn />
              <KakaoBtn />
              <GuestBtn />
            </div>
          </section>
        </div>
      </LoginModal>
    </>
  );
};

export default Login;
