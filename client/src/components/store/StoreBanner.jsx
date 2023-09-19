const StoreBanner = ({ menu }) => {
  return (
    <div className="flex w-full h-80">
      <img
        className="w-full object-cover rounded-lg"
        src={menu.img}
        alt="배너 이미지"
      />
    </div>
  );
};

export default StoreBanner;
