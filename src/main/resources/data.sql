-- region 데이터는 혼선을 방지하기 위해 id를 추가하여 기입(없어도 정상적으로 동작함)
INSERT INTO region (id, region_name, parent_id)
values (1, '서울시', NULL),
       (2, '강남구', 1),
       (3, '서초구', 1);

INSERT INTO store (address, created_at, img, introduction, last_modified_at, phone_num, rating, store_name, region_id)
values ('1234', '2022-08-16T17:30:57', 'http', '설명1', '2022-08-16T17:30:57', '01000001111', '4.1', '김가네', 1),
       ('5678', '2022-08-16T17:30:57', 'http', '설명2', '2022-08-16T17:30:57', '01000002222', '4.2', '이가네', 2),
       ('9101', '2022-08-16T17:30:57', 'http', '설명3', '2022-08-16T17:30:57', '01000003333', '4.3', '최가네', 3);

INSERT INTO review (rating, content, img, store_id)
values (4, '맛있어용 진짜루', 'http:', 1),
       (1, '우엑 이게 무슨 맛이야', NULL, 2);

INSERT INTO menu (store_id, menu_name, price)
values (1, '소금빵', 3000),
       (1, '계란빵', 1000),
       (2, '소금빵', 2500),
       (2, '피자빵', 5000),
       (3, '맛있는 소금빵', 50000);

INSERT INTO member (nickname)
values ('길동이'), --1
       ('흰둥이'); --2

INSERT INTO orders (store_id, member_id, order_status)
values (1, 1, 'ACTIVE');

INSERT INTO order_menu (orders_id, menu_id, quantity)
values (1, 2, 3);