import { Stars } from '../../components/Stars.jsx';
import { useRatingStore } from '../../store/store.js';

const ReviewPost = () => {
  const { rating, setRating } = useRatingStore();

  return (
    <>
      <h1>매장 평가</h1>
      <Stars rating={rating} onChangeRating={setRating} />
      <textarea
        name="storeReview"
        id="storeReview"
        cols="30"
        rows="10"
        placeholder="영문 기준 200자 이내로 작성"
      ></textarea>
      <h1>메뉴 평가</h1>
    </>
  );
};

export default ReviewPost;
