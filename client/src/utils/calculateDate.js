export const calculateDate = (created_at) => {
  const currentDate = new Date();
  const createdAtDate = new Date(created_at);
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); // 밀리초 -> 초 -> 분 -> 시간 -> 일

  if (daysDifference >= 365) {
    return `${Math.floor(daysDifference / 365)}년`;
  } else if (daysDifference >= 30) {
    return `${Math.floor(daysDifference / 30)}월`;
  } else if (daysDifference >= 1) {
    return `${daysDifference}일`;
  } else {
    const hoursDifference = Math.floor(timeDifference / (1000 * 3600)); // 밀리초 -> 초 -> 분 -> 시간
    if (hoursDifference >= 1) {
      return `${hoursDifference}시간`;
    } else {
      return `방금`;
    }
  }
};
