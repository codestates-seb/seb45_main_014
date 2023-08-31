import images from '../../assets/images/Images';
import Button from '../../components/Button.jsx';
import { userFormStore } from '../../store/store';
import { useEffect } from 'react';
import { Input, InputBox } from '../../assets/Styles.jsx';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateNickname,
  validatePhone,
} from '../../utils/validators';

const SignUpPage = () => {
  const {
    email,
    password,
    confirmPassword,
    nickname,
    phone,
    setErrors,
    errors,
    setEmail,
    setPassword,
    setConfirmPassword,
    setNickname,
    setPhone,
  } = userFormStore();

  useEffect(() => {
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = '유효한 이메일을 입력해주세요.';
    }

    if (!validatePassword(password)) {
      newErrors.password =
        '비밀번호는 8자 이상이면서 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!validateNickname(nickname)) {
      newErrors.nickname = '닉네임은 한글 6자, 영문 12자까지 가능합니다.';
    }

    if (!validatePhone(phone)) {
      newErrors.phone = '유효한 전화번호를 입력해주세요.';
    }

    setErrors(newErrors);
  }, [email, password, confirmPassword, nickname, phone, setErrors]);

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
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputBox>
          <span className="text-red-500">{errors.email}</span>
          <InputBox>
            <label htmlFor="password" className="block">
              비밀번호
            </label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              required=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputBox>
          <span className="text-red-500">{errors.password}</span>
          <InputBox>
            <label htmlFor="password-confirm" className="block">
              비밀번호 확인
            </label>
            <Input
              type="password"
              id="password-confirm"
              placeholder="••••••••"
              required=""
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputBox>
          <span className="text-red-500">{errors.confirmPassword}</span>
          <InputBox>
            <label htmlFor="nickname" className="block">
              닉네임
            </label>
            <Input
              type="text"
              id="nickname"
              placeholder="nickname"
              required=""
              onChange={(e) => setNickname(e.target.value)}
            />
          </InputBox>
          <span className="text-red-500">{errors.nickname}</span>
          <InputBox>
            <label htmlFor="phone" className="block">
              전화번호
            </label>
            <Input
              type="tel"
              id="phone"
              placeholder="01012345678 / - 없이 입력하세요"
              required=""
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputBox>
          <span className="text-red-500">{errors.phone}</span>
          <Button className="mt-5">회원가입</Button>
        </form>
      </section>
    </div>
  );
};

export default SignUpPage;
