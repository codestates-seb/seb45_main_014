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

const ModalContent = ({ message }) => (
  <div className="flex flex-col items-center py-10 px-8 w-[350px]">
    <p>{message}</p>
  </div>
);

const Button = ({ label, onClick }) => (
  <button className="w-full hover:bg-gray-100" onClick={onClick}>
    {label}
  </button>
);

const SubmitModal = ({
  onClose,
  onSubmit,
  message,
  cancelLabel,
  submitLabel,
}) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal padding={'0'} top={'45%'}>
        <ModalContent message={message} />
        <ButtonContainer>
          <Button label={cancelLabel} onClick={onClose} />
          <Button label={submitLabel} onClick={onSubmit} />
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default SubmitModal;
