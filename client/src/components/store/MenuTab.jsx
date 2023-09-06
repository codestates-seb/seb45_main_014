const MenuTab = ({ menuData }) => {
  return (
    <div className="flex flex-col">
      {menuData.map((menu) => (
        <MenuItem key={menu.id} data={menu} />
      ))}
    </div>
  );
};

export default MenuTab;

export const MenuItem = ({ data }) => {
  return (
    <div className="flex p-[10px] border-b">
      <div className="w-[750px]">
        <h3 className="text-[25px]">{data.menu_name}</h3>
        <div className="text-[15px]">{data.menu_desc}</div>
      </div>
      <div className="">
        <img
          className="w-[300px] h-[200px] object-cover rounded-lg"
          src={data.img}
          alt="메뉴 이미지"
        ></img>
        <div className="flex space-x-36">
          <div>{data.price.toLocaleString()}원</div>
          <div>남은 수량: {data.stock}</div>
        </div>
      </div>
    </div>
  );
};
