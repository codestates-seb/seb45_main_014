import { styled } from 'styled-components';
import { InputBox, Input } from '../../assets/Styles.jsx';
import images from '../../assets/images/Images';
import Button from '../../components/Button.jsx';
import { Link } from 'react-router-dom';

const CancelButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.4);
`;

const EditProfile = () => {
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
          {/* 기존 사용자일 경우 placeholder가 아닌 기존 닉네임이 value에 들어감 */}
          <InputBox>
            <label htmlFor="nickname" className="block">
              닉네임
            </label>
            <Input type="text" id="nickname" placeholder="빵돌이" required="" />
          </InputBox>
          <InputBox>
            <label htmlFor="phone" className="block">
              전화번호
            </label>
            <Input
              type="tel"
              id="phone"
              placeholder="01012345678"
              required=""
            />
          </InputBox>
          <div className="flex gap-4">
            {/* 초기 회원일 경우 입력으로 바뀜 */}
            {/* 초기 회원일 경우 필수로 입력하지 않으면 경고창 */}
            <Button className="mt-5">회원정보 수정</Button>
            <CancelButton className="mt-5">
              <Link to="/mypage">취소</Link>
            </CancelButton>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
