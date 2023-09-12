import { Stars } from '../../components/Stars.jsx';
import {
  useRatingStore,
  useImageStore,
  useByteSizeStore,
  useAuthStore,
} from '../../store/store.js';
import { styled } from 'styled-components';
import { StoreImage } from '../../assets/Styles.jsx';
import Button from '../../assets/buttons/Button.jsx';
import formatDate from '../../utils/formatDate.js';
import { Modal, ModalOverlay } from '../../assets/Modal.jsx';
import { useState } from 'react';
import axios from 'axios';
import { CloseButton } from '../login/Login.jsx';

const TextBox = styled.textarea`
  border: 1px solid #b6a280;
`;

const StoreSummary = styled.div`
  padding: 5px;
`;

const MenuSummary = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
`;

const ByteCount = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${(props) => (props.isOver ? 'red' : 'inherit')};
`;

const MAX_BYTE_LIMIT = 200;

const OrderedMenus = ({ menu }) => {
  return (
    <MenuSummary>
      <div className="flex flex-col">
        <div>{menu.menu_name}</div>
        <div>{menu.quantity} 개</div>
      </div>
      <div>{menu.price} 원</div>
    </MenuSummary>
  );
};

const PostReview = ({ data, closeModal }) => {
  const { rating, setRating } = useRatingStore();
  const { selectedImage, setSelectedImage } = useImageStore();
  const { text, setText } = useByteSizeStore();
  const [isSubmitting, setIsSubmitting] = useState(false); // 전송 중 여부
  const { accessToken } = useAuthStore((state) => state);

  const menu = data.order_menus;
  const orderDate = formatDate(data.created_at);

  const apiUrl = `${process.env.REACT_APP_API_URL}`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1024 * 1024) {
        setSelectedImage(file);
      } else {
        alert('이미지 크기는 1MB를 초과할 수 없습니다.');
      }
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_BYTE_LIMIT) {
      setText(newText);
    }
  };

  const handleCloseModal = () => {
    setRating(0);
    setSelectedImage(null);
    setText('');

    closeModal(rating, selectedImage, text);
  };

  const handleReviewSubmit = async () => {
    setIsSubmitting(true); // 전송 시작

    // 첫 번째 요청: 이미지 업로드
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const imageResponse = await axios.post(
        `${apiUrl}/api/orders.${data.id}/reviews`, // 아마 이미지 업로드 API 주소로 수정할 것
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // 리뷰 데이터 저장
      const reviewData = {
        content: text,
        rating,
        imageUrl: imageResponse.data.url,
      };

      const reviewResponse = await axios.post(
        `${apiUrl}/api/orders.${data.id}/reviews`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (reviewResponse.status === 200) {
        alert('리뷰가 작성되었습니다.');
        setIsSubmitting(false);
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalOverlay onClick={handleCloseModal} />
      <Modal>
        <div className="max-w-screen-sm mx-auto flex flex-col gap-4">
          <CloseButton onClick={handleCloseModal}>×</CloseButton>
          <div className="flex justify-between">
            <h2>{orderDate}</h2>
          </div>
          <StoreSummary>
            <StoreImage src={menu[0].img} alt="매장 대표 이미지" />
            <h2>{data.store_name}</h2>
            {menu.map((item, index) => (
              <OrderedMenus key={index} menu={item} />
            ))}
          </StoreSummary>
          <div className="flex justify-end">
            <Stars rating={rating} onChangeRating={setRating} />
          </div>
          <TextBox
            name="storeReview"
            id="storeReview"
            cols="20"
            rows="10"
            value={text}
            onChange={handleTextChange}
            placeholder=" 200자 이내로 작성"
          ></TextBox>
          <ByteCount isExceeded={text.length > MAX_BYTE_LIMIT}>
            {`${text.length} / ${MAX_BYTE_LIMIT} 글자`}
          </ByteCount>
          <div className="flex justify-between items-center">
            <input
              className="w-1/3"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <div className="flex items-center">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="선택한 이미지"
                  className="w-20 h-20 object-cover"
                />
              </div>
            )}
          </div>
          <Button
            onClick={isSubmitting ? null : handleReviewSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '리뷰 작성'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PostReview;
