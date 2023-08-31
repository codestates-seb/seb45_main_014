export const calculateDate = (created_at) => {
  const currentDate = new Date();
  const createdAtDate = new Date(created_at);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // 밀리초 -> 초 -> 분 -> 시간 -> 일

  return daysDifference;
};
