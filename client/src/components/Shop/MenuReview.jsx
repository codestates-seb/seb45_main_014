import menuimg from '../../assets/images/menu_img1.png';
import { styled } from 'styled-components';
const MenuReview = () => {
  return (
    <>
      <div className="text-center m-4 flex justify-center">
        <div className="mr-12 text-center pt-1">
          <div className="m-3">리뷰</div>
          <div className="m-3">나는 종호</div>
          <div className="m-3">별점</div>
          <div className="m-3">처음 먹어 봤는데 너무 맛있어요!</div>
        </div>
        <div>
          <ReviewImg src={menuimg} alt="메뉴 이미지" />
        </div>
      </div>
    </>
  );
};

export default MenuReview;

const ReviewImg = styled.img`
  width: 200px;
  height: 150px;
  text-align: right;
`;
