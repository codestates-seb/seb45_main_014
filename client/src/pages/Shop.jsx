import { styled } from 'styled-components';
import ShopInfo from '../components/Shop/ShopInfo.jsx';
import Menu from '../components/Shop/Menu.jsx';
import MenuReview from '../components/Shop/MenuReview.jsx';
import menu from '../assets/data/menuData.js';
import store from '../assets/data/storeData.js';
import reviewData from '../assets/data/reviewData.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Shop = () => {
  const { id } = useParams();
  const [data, setData] = useState(store);

  const filteredData = store.filter((data) => data.id === Number(id));

  useEffect(() => {
    setData(filteredData);
    console.log(data);
  }, [id]);

  return (
    <div className="flex flex-col">
      <p>현재 파라미터는 {id}</p>
      <ShopInfo store={data[0]} menu={menu} />
      <div>
        <h2 className="border-t mt-8 pt-6 max-w-4xl mx-auto">
          메뉴 ({menu.length})
        </h2>
        {menu.map((menu, index) => {
          return (
            <Menu key={index} menu={menu} isLast={index === menu.length - 1} />
          );
        })}
      </div>
      <div>
        <h2 className=" mt-8 pt-6 max-w-4xl mx-auto border-t">
          리뷰 ({reviewData.length})
        </h2>
        {reviewData.map((review, index) => {
          return <MenuReview key={index} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
