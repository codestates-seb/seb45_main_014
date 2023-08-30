import { Stars } from '../../components/Stars.jsx';
import { useRatingStore, useImageStore } from '../../store/store.js';
import { styled } from 'styled-components';
import { StoreImage } from '../../assets/Styles.jsx';
import Button from '../../components/Button.jsx';

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

const PostReview = () => {
  const { rating, setRating } = useRatingStore();
  const { selectedImage, setSelectedImage } = useImageStore();

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

  return (
    <div className="max-w-screen-sm mx-auto flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>2023-07-30</h2>
      </div>
      <StoreSummary>
        <StoreImage
          src={`https://picsum.photos/300/200`}
          alt="매장 대표 이미지"
        />
        <h2>가게 이름</h2>
        <MenuSummary>
          <div className="flex flex-col">
            <div>🍞 바다에 절인 소금빵</div>
            <div>{'200,000'} 개</div>
          </div>
          <div>{'19,500'} 원</div>
        </MenuSummary>
        <MenuSummary>
          <div className="flex flex-col">
            <div>🍞 파인애플 김밥</div>
            <div>{'2'} 개</div>
          </div>
          <div>{'500'} 원</div>
        </MenuSummary>
      </StoreSummary>
      <div className="flex justify-end">
        <Stars rating={rating} onChangeRating={setRating} />
      </div>
      <TextBox
        name="storeReview"
        id="storeReview"
        cols="30"
        rows="10"
        placeholder="영문 기준 200자 이내로 작성"
      ></TextBox>
      <div className="flex justify-between items-center">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <div className="flex items-center">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="선택한 이미지"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
      <Button>리뷰 작성</Button>
    </div>
  );
};

export default PostReview;
