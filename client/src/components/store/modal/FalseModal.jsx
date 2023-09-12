import { React, useEffect } from 'react';

const FalseModal = ({ closeFalseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeFalseModal}>
          &times;
        </span>
        <h2>장바구니 추가 실패</h2>
        <p>
          다른 매장의 상품이 장바구니에 존재 합니다. 장바구니를 비우고 현재
          메뉴를 담으시겠습니까?
        </p>
      </div>
      <button>장바구니에 담기</button>
    </div>
  );
};

export default FalseModal;
