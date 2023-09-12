import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/store';
import axios from 'axios';

const Greeting = () => {
  const [nickname, setNickname] = useState('');
  const { accessToken } = useAuthStore((state) => state);
  // axios로 닉네임 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setNickname(res.data.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);
  return (
    <div>
      <span className="font-bold">{nickname}</span> 님
    </div>
  );
};

export default Greeting;
