import { styled } from 'styled-components';
import { ModalOverlay, Modal } from '../../assets/Modal.jsx';

const ButtonContainer = styled.div`
  display: flex;
  border-top: 1px solid rgb(234, 244, 246);
  justify-content: flex-start;
  padding: 0px;
  margin-top: 0px;
  height: 56px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  color: #b3915f;
  font-weight: 600;
  button {
    &:last-of-type {
      border-left: 1px solid rgb(234, 244, 246);
    }
  }
`;

const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal padding={'0'} top={'45%'}>
        <div className="flex flex-col items-center py-10 px-8 w-[350px]">
          <p>정말 삭제하시겠습니까?</p>
        </div>
        <ButtonContainer>
          <button className="w-full hover:bg-gray-100" onClick={onClose}>
            취소
          </button>
          <button className="w-full hover:bg-gray-100" onClick={onDelete}>
            삭제
          </button>
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default DeleteModal;
