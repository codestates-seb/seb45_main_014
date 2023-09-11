import { styled } from 'styled-components';
import { InputBox, Input } from '../../assets/Styles.jsx';
import images from '../../assets/images/Images';
import Button from '../../assets/buttons/Button.jsx';
import axios from 'axios';
import { useAuthStore } from '../../store/store.js';
import { Modal, ModalOverlay } from '../../assets/Modal.jsx';

export const CancelButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.4);
`;

const EditProfile = ({ onClose }) => {
  const { accessToken } = useAuthStore((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nickname = e.target.nickname.value;

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/member`,
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        alert('회원정보가 수정되었습니다.');
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal>
        <div className="flex flex-col items-center">
          <img
            src={images.mainlogo}
            alt="main logo"
            width={'200px'}
            className="mt-8"
          />
          <section className="bg-amber-200 p-5 mt-5 rounded-lg">
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <InputBox>
                <label htmlFor="nickname" className="block">
                  닉네임
                </label>
                <Input
                  type="text"
                  id="nickname"
                  placeholder="빵돌이"
                  required=""
                />
              </InputBox>
              <div className="flex gap-4">
                <Button className="mt-5" type="submit">
                  회원정보 수정
                </Button>
                <CancelButton className="mt-5" type="button" onClick={onClose}>
                  취소
                </CancelButton>
              </div>
            </form>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default EditProfile;
