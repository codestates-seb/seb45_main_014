import menuimg from '../../assets/images/menu_img1.png';
import { styled } from 'styled-components';
const MenuReview = () => {
  return (
    <>
      <div className="text-center m-4 flex flex-col justify-center border-b pl-60">
        <div className="flex p-3">
          <img
            className="w-20 h-20 mr-6 rounded-full"
            src={menuimg}
            alt="프로필 이미지"
          />
          <div className="flex flex-col justify-center text-center">
            <div className="mb-1 text-left">김소금</div>
            <div className="text-left">레이팅 점수</div>
          </div>
        </div>
        {/* 사용자 정보 */}
        <div className="text-left m-6">리뷰 내용</div>
        {/* 리뷰 내용 */}
      </div>
    </>
  );
};

export default MenuReview;
