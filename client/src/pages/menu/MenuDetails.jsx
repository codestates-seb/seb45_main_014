import { styled } from 'styled-components';
import MenuPriceinvnt from '../../components/MenuDetails/MenuPriceinvnt.jsx';
import images from '../../assets/images/Images.js';

const MenuDetails = () => {
  const menuname = '소금 빵';
  const menucontent =
    '버터를 베이스로 한 빵의 표면에 소금을 뿌려, 버터의 고소한 풍미를 짭짤한 소금을 통해 강조한 빵. 재료 : 밀가루, 설탕, 소금, 버터, 효모';
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto justify-center text-center">
      <div className="">
        <SelectMenuImg src={images.menu}></SelectMenuImg>
        <h1 className="m-3 pr-80">{menuname}</h1>
        <SelectMenuContents>{menucontent}</SelectMenuContents>
      </div>
      <MenuPriceinvnt />
    </div>
  );
};

export default MenuDetails;

const SelectMenuImg = styled.img`
  color: white;
  width: 400px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const SelectMenuContents = styled.div`
  width: 400px;
  height: 200px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
  background-color: rgba(217, 217, 217);
`;
