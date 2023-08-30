import { Input, InputBox, SocialLoginButton } from '../../assets/Styles.jsx';
import images from '../../assets/images/Images';
import Button from '../../components/Button.jsx';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={images.mainlogo}
        alt="main logo"
        width={'200px'}
        className="mt-8"
      />
      <section className="bg-amber-200 p-5 mt-5 rounded-lg">
        <form className="flex flex-col items-center">
          <InputBox>
            <label htmlFor="email" className="block">
              이메일
            </label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required=""
            />
          </InputBox>
          <InputBox>
            <label htmlFor="password" className="block">
              비밀번호
            </label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              required=""
            />
          </InputBox>
          <Button className="mt-5">로그인</Button>
          <div className="flex justify-evenly mt-5 p-5 w-full border-t-2 border-gray-400 ">
            <SocialLoginButton
              className="rounded-full"
              src={images.google}
              alt="구글 로그인 버튼"
            ></SocialLoginButton>
            <SocialLoginButton
              className="rounded-full"
              src={images.kakao}
              alt="카카오 로그인 버튼"
            ></SocialLoginButton>
            <SocialLoginButton
              className="rounded-full"
              src={images.naver}
              alt="카카오 로그인 버튼"
            ></SocialLoginButton>
          </div>
          <div>
            회원가입이 필요합니까?
            <Link to="/signup">
              <span className="text-blue-600 cursor-pointer hover:text-blue-300">
                Sign Up
              </span>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
