import { styled } from 'styled-components';

const Menu = () => {
  return (
    <>
      <div>
        <div>
          <div>메뉴 이름</div>
          <div>메뉴 설명</div>
          <div>메뉴 가격</div>
        </div>
        <div>
          <div>남은 수량</div>
          <MenuImgBox>메뉴 이미지</MenuImgBox>
        </div>
      </div>
    </>
  );
};

export default Menu;

const MenuImgBox = styled.div`
  background-color: red;
`;
