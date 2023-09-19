import images from '../assets/images/Images';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-solid border border-yellow-500">
        {/* <h1 className="text-4xl font-bold mb-4">404 Not Found</h1> */}
        <img src={images.notfound} alt="not found" />
        <p className="flex justify-center text-lg text-gray-600">
          죄송합니다, 요청하신 페이지를 찾을 수 없습니다.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
