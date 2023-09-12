const SuccessModal = ({ closeSuccessModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeSuccessModal}>
          &times;
        </span>
        <h2>장바구니 등록 완료</h2>
        <p>장바구니에 상품이 정상적으로 추가 되었습니다.</p>
      </div>
    </div>
  );
};

export default SuccessModal;
