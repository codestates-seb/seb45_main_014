import axios from 'axios';
import { useAuthStore, useCartItemStore } from '../store/store';

export const useCartApi = () => {
  const { accessToken } = useAuthStore();
  const API = process.env.REACT_APP_API_URL;
  const { setCartItem, setStoreId, setCheckItem } = useCartItemStore();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  // 장바구니 GET 요청
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/api/cart`, config);
      return response.data.order;
    } catch (error) {
      console.error(error);
    }
  };

  // 장바구니에 아이템 추가 POST 요청 (해주세요 ㅎㅎ)
  const addCart = async (data) => {
    try {
      // POST 해서 볶아먹을 내용
    } catch (error) {
      console.error(error);
    }
  };

  // 장바구니에서 아이템 삭제 DELETE 요청
  const deleteCart = async (data) => {
    try {
      await axios.delete(`${API}/api/cart`, {
        ...config,
        data: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 장바구니에 체크된 아이템 주문 POST 요청
  const orderCart = async (pickupTime) => {
    try {
      await axios.post(
        `${API}/api/cart?pickup_time=${pickupTime}`,
        null,
        config,
      );
      // 성공한 경우
      alert('주문이 완료되었습니다.');
    } catch (error) {
      console.error('주문 중 오류가 발생했습니다.', error);
      alert('주문 중 오류가 발생했습니다.');
    }
  };

  // 장바구니의 아이템이 수량이 변경된 경우 POST 요청
  const updateCart = async (itemId, quantity) => {
    try {
      await axios.post(
        `${API}/api/cart/${itemId}?quantity=${quantity}`,
        null,
        config,
      );
      const response = await fetchCart();
      setCartItem(response.order_menus);
      setCheckItem(response.order_menus.map((item) => item.id));
      setStoreId(response.store_id);
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchCart, addCart, deleteCart, orderCart, updateCart };
};
