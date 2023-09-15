import StoreCard from '../../assets/StoreCard.jsx';

const Favorites = ({ data }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center mx-4">
        {data.map((store, index) => (
          <StoreCard key={index} store={store} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
