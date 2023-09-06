import { Stars } from '../../components/Stars.jsx';
import {
  useRatingStore,
  useImageStore,
  useByteSizeStore,
} from '../../store/store.js';
import { styled } from 'styled-components';
import { StoreImage } from '../../assets/Styles.jsx';
import Button from '../../assets/buttons/Button.jsx';
import { getByteSize } from '../../utils/getByteSize.js';
import orderData from '../../assets/data/orderData';
import { useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate.js';

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

const ByteCount = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${(props) => (props.isOver ? 'red' : 'inherit')};
`;

const MAX_BYTE_LIMIT = 300;

const OrderedMenus = ({ menu }) => {
  return (
    <MenuSummary>
      <div className="flex flex-col">
        <div>{menu.menu_name}</div>
        <div>{menu.quantity} 개</div>
      </div>
      <div>{menu.price} 원</div>
    </MenuSummary>
  );
};

const PostReview = () => {
  const { rating, setRating } = useRatingStore();
  const { selectedImage, setSelectedImage } = useImageStore();
  const { text, setText } = useByteSizeStore();
  const { id } = useParams();
  const storeId = Number(id);

  const order = orderData.find((item) => item.storeId === storeId);
  const menu = order.order_menus;
  const orderDate = formatDate(order.created_at);

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

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (getByteSize(newText) <= MAX_BYTE_LIMIT) {
      setText(newText);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>{orderDate}</h2>
      </div>
      <StoreSummary>
        <StoreImage src={menu[0].img} alt="매장 대표 이미지" />
        <h2>{order.store_name}</h2>
        {menu.map((item, index) => (
          <OrderedMenus key={index} menu={item} />
        ))}
      </StoreSummary>
      <div className="flex justify-end">
        <Stars rating={rating} onChangeRating={setRating} />
      </div>
      <TextBox
        name="storeReview"
        id="storeReview"
        cols="30"
        rows="10"
        value={text}
        onChange={handleTextChange}
        placeholder="영문 기준 300자 이내로 작성"
      ></TextBox>
      <ByteCount isExceeded={getByteSize(text) > MAX_BYTE_LIMIT}>
        {`${getByteSize(text)} / ${MAX_BYTE_LIMIT} byte`}
      </ByteCount>
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
