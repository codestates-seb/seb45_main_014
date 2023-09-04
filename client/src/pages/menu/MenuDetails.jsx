import { styled } from 'styled-components';
import MenuPriceinvnt from '../../components/MenuDetails/MenuPriceinvnt.jsx';
import { useLocation } from 'react-router-dom';

const MenuDetails = ({ menu }) => {
  const location = useLocation();
  const menuData = location.state.menu;
  const menuIngredient = menuData.ingredient;
  console.log(menuIngredient);
  console.log(menuData);
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto justify-center text-center mt-4">
      <div className="">
        <SelectMenuImg src={menuData.img}></SelectMenuImg>
        <h1 className="m-3 pr-80">{menuData.menu_name}</h1>
        <SelectMenuContents>{menuData.menu_desc}</SelectMenuContents>
      </div>
      <MenuPriceinvnt menuData={menuData} />
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
  border-radius: 8px;
`;

const SelectMenuContents = styled.div`
  width: 400px;
  height: 200px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
  background-color: rgba(217, 217, 217);
  border-radius: 8px;
`;
