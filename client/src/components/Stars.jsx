import images from '../assets/images/Images';

export const Stars = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <img
          key={star}
          src={star <= rating ? images.bookmarkOn : images.bookmarkOff}
          alt="별점"
          width="20px"
          height="20px"
        />
      ))}
    </div>
  );
};
