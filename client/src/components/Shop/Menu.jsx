import { styled } from 'styled-components';
import { Wrapper } from '@googlemaps/react-wrapper';

const Menu = () => {
  return (
    <>
      <div className="flex justify-center m-6">
        <div className="mr-12 text-center">
          <div>메뉴 이름</div>
          <div>메뉴 설명</div>
          <div>메뉴 가격</div>
        </div>
        <div className="flex flex-col">
          <div>남은 수량</div>
          <MenuImgBox>메뉴 이미지</MenuImgBox>
        </div>
      </div>
    </>
  );
};

export default Menu;

const MenuImgBox = styled.div`
  width: 200px;
  height: 150px;
  background-color: red;
  text-align: right;
`;
