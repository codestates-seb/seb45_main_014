import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import images from '../../assets/images/Images';
const Menu = ({ menu }) => {
  const navigate = useNavigate();

  const MenuImgHandle = () => {
    navigate('/menu');
  };

  return (
    <>
      <div className="flex justify-center mt-6 border-b w-5/5">
        <div className="mr-12 text-center pt-8 w-80">
          <div className="m-3 text-left">{menu.menu_name}</div>
          <div className="m-3 text-left">{menu.menu_desc}</div>
          <div className="m-3 text-right">{menu.price} 원</div>
        </div>
        <div className="flex flex-col mb-8">
          <MenuImgBox
            onClick={MenuImgHandle}
            src={menu.img}
            alt="메뉴 이미지"
          />
          <div className="text-right mt-3">남은 수량 {menu.stock}개</div>
        </div>
      </div>
    </>
  );
};

export default Menu;

const MenuImgBox = styled.img`
  width: 230px;
  height: 150px;
  text-align: right;
  border-radius: 8px;
`;
