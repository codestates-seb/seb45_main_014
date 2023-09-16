export const handleImgError = (e) => {
  e.target.src = './noImage.png';
  e.target.style.width = '60%';
  e.target.style.margin = '0 auto';
};
