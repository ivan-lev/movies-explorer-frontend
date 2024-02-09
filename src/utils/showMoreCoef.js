// this function is calculating how many movie cards
// will be displayed on 'show more' button click
// depending on current window width

export const showMoreCoef = () => {
  const windowInnerWidth = window.innerWidth;
  let coefficient;

  if (windowInnerWidth >= 768) {
    coefficient = 12;
  }

  if (windowInnerWidth > 540 && windowInnerWidth <= 768) {
    coefficient = 8;
  }
  if (windowInnerWidth <= 540) {
    coefficient = 5;
  }
  return coefficient;
};
