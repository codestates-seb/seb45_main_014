const orderData = [
  {
    id: 1,
    storeId: 2,
    store_name: '파리바게뜨',
    order_status: '준비완료',
    pickup_time: '2022-08-16T17:30:57',
    last_modified_at: '2022-08-16T17:30:57',
    created_at: '2022-08-16T17:30:57',
    order_menus: [
      {
        id: 1,
        menu_name: '소금빵',
        img: 'https://source.unsplash.com/random/?Ciabatta',
        price: 3000,
        quantity: 6,
      },
    ],
  },
  {
    id: 2,
    storeId: 3,
    store_name: '뚜레쥬르',
    order_status: '배달중',
    pickup_time: '2022-08-16T18:45:22',
    last_modified_at: '2022-08-16T18:45:22',
    created_at: '2022-08-16T18:45:22',
    order_menus: [
      {
        id: 2,
        menu_name: '치즈크로와상',
        img: 'https://source.unsplash.com/random/?CRoissant',
        price: 4500,
        quantity: 3,
      },
      {
        id: 3,
        menu_name: '아메리카노',
        price: 2500,
        quantity: 2,
      },
    ],
  },
  {
    id: 3,
    storeId: 1,
    store_name: '빵굽는사람',
    order_status: '주문접수',
    pickup_time: '2022-08-17T10:15:00',
    last_modified_at: '2022-08-17T10:15:00',
    created_at: '2022-08-17T10:15:00',
    order_menus: [
      {
        id: 4,
        menu_name: '단팥빵',
        img: 'https://source.unsplash.com/random/?DOughnut',
        price: 2800,
        quantity: 4,
      },
      {
        id: 5,
        menu_name: '카페라떼',
        price: 3500,
        quantity: 1,
      },
    ],
  },
  {
    id: 4,
    storeId: 4,
    store_name: '빵집',
    order_status: '준비중',
    pickup_time: '2022-08-17T14:30:15',
    last_modified_at: '2022-08-17T14:30:15',
    created_at: '2022-08-17T14:30:15',
    order_menus: [
      {
        id: 6,
        menu_name: '크림빵',
        img: 'https://source.unsplash.com/random/?Sourdough',
        price: 3200,
        quantity: 2,
      },
      {
        id: 7,
        menu_name: '카푸치노',
        price: 3800,
        quantity: 1,
      },
    ],
  },
  {
    id: 5,
    storeId: 2,
    store_name: '로또돼서 만든 빵집',
    order_status: '구매완료',
    pickup_time: '2022-08-18T09:00:45',
    last_modified_at: '2022-08-18T09:00:45',
    created_at: '2022-08-18T09:00:45',
    order_menus: [
      {
        id: 8,
        menu_name: '팥빵',
        img: 'https://source.unsplash.com/random/?Brioche',
        price: 2600,
        quantity: 5,
      },
      {
        id: 9,
        menu_name: '아이스라떼',
        price: 2800,
        quantity: 3,
      },
    ],
  },
];

export default orderData;
