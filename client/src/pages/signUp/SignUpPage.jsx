import images from '../../assets/images/Images';
import { styled } from 'styled-components';
import Button from '../../components/Button.jsx';

const Input = styled.input`
  width: 20rem;
  height: 3rem;
  margin-top: 0.75rem;
  padding: 0.75rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
`;

const InputBox = styled.div`
  margin-top: 0.75rem;
`;

const SignUpPage = () => {
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
              이메일을 입력하세요
            </label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required=""
            />
            {/* <Button>중복 확인</Button> */}
          </InputBox>
          <InputBox>
            <label htmlFor="password" className="block">
              비밀번호를 입력하세요
            </label>
            <Input
              type="password"
              id="password"
              placeholder="********"
              required=""
            />
          </InputBox>
          <InputBox>
            <label htmlFor="password-confirm" className="block">
              비밀번호를 다시 입력하세요
            </label>
            <Input
              type="password"
              id="password-confirm"
              placeholder="********"
              required=""
            />
          </InputBox>
          <InputBox>
            <label htmlFor="nickname" className="block">
              닉네임을 입력하세요
            </label>
            <Input
              type="text"
              id="nickname"
              placeholder="nickname"
              required=""
            />
          </InputBox>
          <InputBox>
            <label htmlFor="phone" className="block">
              전화번호를 입력하세요
            </label>
            <Input
              type="tel"
              id="phone"
              placeholder="010-1234-5678"
              required=""
            />
          </InputBox>
        </form>
      </section>
    </div>
  );
};

export default SignUpPage;
