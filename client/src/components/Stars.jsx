import images from '../assets/images/Images';

export const Stars = ({ rating, onChangeRating, readOnly }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <div
          key={star}
          className={`star ${star <= rating ? 'active' : ''}`}
          onClick={readOnly ? null : () => onChangeRating(star)}
          role={readOnly ? null : 'button'}
          tabIndex={0}
        >
          <img
            src={star <= rating ? images.bookmarkOn : images.bookmarkOff}
            alt={`별점 ${star}`}
            width="20px"
            height="20px"
          />
        </div>
      ))}
    </div>
  );
};
