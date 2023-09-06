// 바이트 크기를 계산하는 함수
export const getByteSize = (str) => {
  let s = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x7f) s += 1;
    else if (code >= 0x80 && code <= 0xffff) s += 3;
  }
  return s;
};
