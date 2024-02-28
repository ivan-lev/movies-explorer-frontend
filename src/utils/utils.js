import { SHORTMETER_DURATION, LAYOUTS } from '../variables/variables';

const cleanQuery = string => {
  return (
    string
      .replace(/\s\s+/g, ' ') // replace multiple spaces with singl ones
      .replace(/[^1-9a-zA-Zа-яА-Я' ]/g, '') // clear words from special characters
      .toLowerCase() // lowercase the phrase
      .split(' ') // split string to array of words
      // remove empty elements and words shorter than 2 letters
      .filter(word => word.length !== 0)
  );
};

export const filterMovies = (searchQuery, movieList, isShortMeter) => {
  let newList;
  if (isShortMeter) {
    newList = movieList.filter(movie => movie.duration < SHORTMETER_DURATION);
  } else {
    newList = movieList;
  }
  const queryWordsArray = cleanQuery(searchQuery);
  const filteredByQueryMovies = newList.filter(movie => {
    return queryWordsArray.some(word => {
      return (
        movie.nameRU.toLowerCase().indexOf(word) !== -1 ||
        movie.nameEN.toLowerCase().indexOf(word) !== -1
      );
    });
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
