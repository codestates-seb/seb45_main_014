import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Menu = ({ menu, isLast }) => {
  const navigate = useNavigate();

  const MenuImgHandle = () => {
    navigate('/menu');
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="max-w-4xl w-full mx-auto">
        <div className="border-t pt-8 pl-20 pr-20">
          <div className="flex justify-center">
            <div className="mr-12 text-center flex-1">
              <h2 className="text-left">{menu.menu_name}</h2>
              <div className="mt-8 text-left">{menu.menu_desc}</div>
            </div>
            <div className="flex flex-col">
              <MenuImgBox
                onClick={MenuImgHandle}
                src={menu.img}
                alt="메뉴 이미지"
              />
              <div className="flex space-x-6">
                <div className="m-3 text-right">{menu.price} 원</div>
                <div className="text-right mt-3">남은 수량 {menu.stock}개</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

const MenuImgBox = styled.img`
  width: 230px;
  height: 150px;
  text-align: right;
  border-radius: 8px;
`;
