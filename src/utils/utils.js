import { LAYOUTS } from '../variables/variables';

const cleanString = string => {
  return (
    string
      .replace(/\s\s+/g, ' ') // replace multiple spaces with singl ones
      .replace(/[^a-zA-Zа-яА-Я' ]/g, '') // clear words from special characters
      .toLowerCase() // lowercase the phrase
      .split(' ') // split string to array of words
      // remove empty elements and words shorter than 2 letters
      .filter(word => word.length > 2)
  );
};

export const filterMovies = (searchQuery, movieList) => {
  const filteredByQueryMovies = movieList.filter(movie => {
    const searchQueryWords = cleanString(searchQuery);
    const movieTitleWords = [...cleanString(movie.nameRU), ...cleanString(movie.nameEN)];
    return movieTitleWords.some(word => searchQueryWords.includes(word));
  });
  return filteredByQueryMovies;
};

// this function is calculating how many movie cards
// will be displayed on 'show more' button click
// depending on current window width

export const layoutConfig = width => {
  let layoutConfig = {};

  if (width >= 768) {
    layoutConfig = {
      displayRows: LAYOUTS.WIDE.ROWS,
      cardsInRow: LAYOUTS.WIDE.ITEMS,
      layout: LAYOUTS.WIDE.DESCRIPTION
    };
    layoutConfig.initialAmount = layoutConfig.displayRows * layoutConfig.cardsInRow;
  }

  if (width > 540 && width < 768) {
    layoutConfig = {
      displayRows: LAYOUTS.MEDIUM.ROWS,
      cardsInRow: LAYOUTS.MEDIUM.ITEMS,
      layout: LAYOUTS.MEDIUM.DESCRIPTION
    };
    layoutConfig.initialAmount = layoutConfig.displayRows * layoutConfig.cardsInRow;
  }
  if (width <= 540) {
    layoutConfig = {
      displayRows: LAYOUTS.NARROW.ROWS,
      cardsInRow: LAYOUTS.NARROW.ITEMS,
      layout: LAYOUTS.NARROW.DESCRIPTION
    };
    layoutConfig.initialAmount = layoutConfig.displayRows;
  }
  return layoutConfig;
};
