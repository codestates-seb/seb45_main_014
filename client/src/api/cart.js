import axios from 'axios';
import { useAuthStore, useCartItemStore } from '../store/store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCartApi = () => {
  const navigate = useNavigate();
  // 에러메시지 Toast message
  const errNotify = (message) => toast.error(message, { id: 'err' });
  const successNotify = (message) =>
    toast.success(message, { id: 'success', duration: 2500 });

  const { accessToken } = useAuthStore();
  const API = process.env.REACT_APP_API_URL;
  const { setCartItem, setStoreId, setCheckItem } = useCartItemStore();
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  // 시간 변환 함수
  const parseDate = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const hour = date.substring(11, 13);
    const minute = date.substring(14, 16);
    return `${month}월 ${day}일 ${hour}시 ${minute}분`;
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

      const response = await fetchCart();
      setCartItem(response.order_menus);
      setCheckItem(response.order_menus.map((item) => item.id));
      setStoreId(response.store_id);
    } catch (error) {
      console.error(error);
    }
  };

  // 장바구니에 체크된 아이템 주문 POST 요청
  const orderCart = async (pickupTime) => {
    try {
      const response = await axios.post(
        `${API}/api/cart?pickup_time=${pickupTime}`,
        null,
        config,
      );
      // 성공 시 response
      const pickup_time = parseDate(response.data.order.pickup_time);
      setCartItem([]);
      setCheckItem([]);
      setStoreId(null);
      successNotify(`주문이 정상적으로 완료되었습니다.`);
      setTimeout(() => {
        navigate(`/mypage#order`);
      }, 1000);
    } catch (error) {
      console.error('주문 중 오류가 발생했습니다.', error);
      errNotify('주문 중 오류가 발생했습니다.');
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

  // 장바구니 재고 확인
  const getStock = async (storeId, itemId) => {
    try {
      const response = await axios.get(
        `${API}/api/stores/${storeId}/menus/${itemId}`,
      );
      console.log(`재고량: ${response.data.menu.stock}`);
      return response.data.menu.stock;
    } catch (error) {
      console.error(error);
    }
  };

  // 선택된 아이템만 주문 POST 요청
  const orderSelectedCart = async (data, pickupTime) => {
    try {
      await axios.delete(`${API}/api/cart`, {
        ...config,
        data: data,
      });

      const response = await axios.post(
        `${API}/api/cart?pickup_time=${pickupTime}`,
        null,
        config,
      );
      // 성공 시 response
      const pickup_time = parseDate(response.data.order.pickup_time);
      setCartItem([]);
      setCheckItem([]);
      setStoreId(null);
      successNotify(`주문이 정상적으로 완료되었습니다.`);
      setTimeout(() => {
        window.location.href = `/mypage#order`;
      }, 1000);
    } catch (error) {
      console.error('주문 중 오류가 발생했습니다.', error);
      errNotify('주문 중 오류가 발생했습니다.');
    }
  };

  return {
    fetchCart,
    addCart,
    deleteCart,
    orderCart,
    updateCart,
    getStock,
    orderSelectedCart,
  };
};
