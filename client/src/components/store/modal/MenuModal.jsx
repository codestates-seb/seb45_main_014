import { styled } from 'styled-components';
import { ModalOverlay, Modal } from '../../../assets/Modal.jsx';

const ButtonContainer = styled.div`
  display: flex;
  border-top: 1px solid rgb(234, 244, 246);
  justify-content: flex-start;
  padding: 0px;
  margin-top: 0px;
  height: 60px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  color: #d3ae72;
  font-weight: 600;
  button {
    &:last-of-type {
      border-left: 1px solid rgb(234, 244, 246);
    }
  }
`;

const ModalContent = styled.div`
  min-width: 430px;
  padding: 2rem 2rem;
`;

const ButtonBox = styled.div`
  display: inline-flex;
  align-content: center;
  align-items: center;
  width: 88px;
  border: 1px solid rgb(221, 223, 225);
  border-radius: 3px;
  button {
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    font-size: 20px;
    &:disabled {
      color: rgb(156, 163, 175);
    }
  }
  div {
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    width: 31px;
    height: 28px;
    line-height: 28px;
    justify-content: center;
  }
`;

const Button = ({ label, onClick }) => (
  <button className="w-full hover:bg-gray-100" onClick={onClick}>
    {label}
  </button>
);

const MenuModal = ({
  data,
  onClose,
  onSubmit,
  amount,
  quantityDown,
  quantityUp,
}) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal padding={'0'} top={'45%'}>
        <ModalContent>
          <section className="max-h-80 min-h-[120px]">
            <h2 className="font-semibold pb-2">{data.menu_name}</h2>
            {/* 메뉴 설명을 쓸 것인지? */}
            <p className="max-h-[100px] mb-4 text-gray-400">{data.menu_desc}</p>
            <div className="flex justify-between items-center">
              <p className="text-base font-semibold">
                {data.price.toLocaleString()}원
              </p>
              <ButtonBox>
                <button
                  type="button"
                  aria-label="수량내리기"
                  onClick={quantityDown}
                  disabled={amount === 1}
                >
                  -
                </button>
                <div>{amount}</div>
                <button
                  type="button"
                  aria-label="수량올리기"
                  onClick={quantityUp}
                >
                  +
                </button>
              </ButtonBox>
            </div>
            <div className="text-sm text-gray-400">
              <p>남은 수량 : {data.stock}</p>
            </div>
          </section>
          <section className="my-2">
            <div className="flex justify-between items-center text-base font-semibold">
              <p>합계</p>
              <div className="flex text-base font-semibold items-center">
                <span className="pr-1 text-2xl">
                  {(amount * data.price).toLocaleString()}
                </span>
                원
              </div>
            </div>
          </section>
        </ModalContent>
        <ButtonContainer>
          <Button label="취소" onClick={() => onClose()} />
          <Button label="담기" onClick={() => onSubmit()} />
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default MenuModal;
