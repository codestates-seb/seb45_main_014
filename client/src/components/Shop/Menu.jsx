import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import menuimg from '../../assets/images/menu_img1.png';
const Menu = () => {
  const menuinventory = 100;
  const navigate = useNavigate();
  const menuimghandle = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className="flex justify-center mt-6 border-b">
        <div className="mr-12 text-center pt-8">
          <div className="m-3 text-left">소금빵</div>
          <div className="m-3 text-left">겉바속촉 고소하고 맛있는 소금빵</div>
          <div className="m-3 text-right">2,000 원</div>
        </div>
        <div className="flex flex-col mb-8">
          <MenuImgBox onClick={menuimghandle} src={menuimg} alt="메뉴 이미지" />
          <div className="text-right mt-3">남은 수량 {menuinventory}개</div>
        </div>
      </div>
    </>
  );
};

export default Menu;

const MenuImgBox = styled.img`
  width: 200px;
  height: 150px;
  text-align: right;
`;
