const StoreBanner = ({ menuimgs }) => {
  return (
    <div className="flex justify-center w-full h-80 overflow-hidden bg-cover bg-center">
      <img
        className="w-full h-full object-cover"
        src={menuimgs.img}
        alt="배너 이미지"
      />
    </div>
  );
};

export default StoreBanner;
