import images from '../../assets/images/Images.js';
import { GoogleBtn, KakaoBtn } from './OauthBtn.jsx';
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

const Login = () => {
  return (
    <LoginModal>
      <div className="flex flex-col items-center">
        <img src={images.mainlogo} alt="main logo" width={'200px'} />
        <section className="rounded-lg mt-5">
          <div>
            <GoogleBtn />
            <KakaoBtn />
          </div>
        </section>
      </div>
    </LoginModal>
  );
};

export default Login;
