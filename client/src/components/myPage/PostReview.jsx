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
import { useRef, useState } from 'react';
import axios from 'axios';
import { CloseButton } from '../login/Login.jsx';
import { useNavigate } from 'react-router-dom';
import { RedButton } from '../../assets/buttons/RedButton.jsx';
import { toast } from 'react-hot-toast';

const PostReviewModal = styled(Modal)`
  width: 600px;

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

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
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false); // 리뷰 전송 여부

  const menu = data.order_menus;
  const orderDate = formatDate(data.created_at);

  const apiUrl = `${process.env.REACT_APP_API_URL}`;

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

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

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_BYTE_LIMIT) {
      setText(newText);
    }
  };

  const handleCloseModal = () => {
    if (isReviewSubmitted) {
      // 리뷰가 작성되었을 경우 바로 닫힘
      setRating(5);
      setSelectedImage(null);
      setText('');
    } else {
      // 리뷰가 작성되지 않았을 경우 확인 메시지 출력
      const isConfirmed = window.confirm(
        '리뷰 작성을 취소하시겠습니까?\n작성하신 내용은 사라집니다ㅇㅇㅇㅇ.',
      );

      if (isConfirmed) {
        setRating(5);
        setSelectedImage(null);
        setText('');
        closeModal(rating, selectedImage, text);
      }
    }
  };

  const handleReviewSubmit = async () => {
    setIsSubmitting(true); // 전송 시작

    // 리뷰 데이터 저장
    const reviewData = {
      content: text,
      rating,
    };

    try {
      // 첫 번째 요청 : 리뷰 작성
      const reviewResponse = await axios.post(
        `${apiUrl}/api/orders/${data.id}/reviews`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (reviewResponse.status === 200) {
        const reviewId = reviewResponse.data.review.id;

        if (selectedImage) {
          // 두 번째 요청: 이미지 업로드 (이미지가 선택된 경우에만 실행)
          const formData = new FormData();
          formData.append('file', selectedImage);

          console.log(
            `Image File: ${selectedImage.name}, Size: ${selectedImage.size}, Type: ${selectedImage.type}`,
          );

          const imageResponse = await axios.post(
            `${apiUrl}/api/reviews/${reviewId}/image`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (imageResponse.status === 200) {
            toast.success('리뷰와 이미지가 업로드되었습니다.');
          }
        } else {
          toast.success('리뷰가 업로드되었습니다.');
        }
        setIsSubmitting(false);
        setIsReviewSubmitted(true);
        navigate('/mypage#review');
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalOverlay onClick={handleCloseModal} />
      <PostReviewModal>
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
          <div className="flex justify-between items-center h-20">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button onClick={triggerFileInput}>이미지 선택</Button>
            {selectedImage && (
              <div className="flex items-center">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="선택한 이미지"
                  className="w-20 h-20 object-cover"
                />
                <RedButton onClick={handleDeleteImage}>삭제</RedButton>
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
      </PostReviewModal>
    </>
  );
};

export default PostReview;
