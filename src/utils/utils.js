const cleanString = string => {
  return string
    .replace(/\s\s+/g, ' ') // replace multiple spaces with singl ones
    .replace(/[^a-zA-Zа-яА-Я' ]/g, '') // clear words from special characters
    .toLowerCase() // lowercase the phrase
    .split(' ') // split string to array of words
    .filter(word => {
      // remove empty elements and short words
      if (word.length > 2) {
        return word;
      }
    });
};

export const filterMovies = (searchQuery, movieList) => {
  const filteredByQueryMovies = movieList.filter(movie => {
    const searchQueryWords = cleanString(searchQuery);
    const movieTitleWords = [];
    movieTitleWords.push(...cleanString(movie.nameRU), ...cleanString(movie.nameEN));
    if (movieTitleWords.some(word => searchQueryWords.includes(word))) {
      return movie;
    }
  });
  return filteredByQueryMovies;
};

// this function is calculating how many movie cards
// will be displayed on 'show more' button click
// depending on current window width

export const layoutConfig = width => {
  let layoutConfig = {};

  if (width >= 768) {
    layoutConfig = { displayRows: 4, cardsInRow: 3, layout: 'wide' };
    layoutConfig.initialAmount = layoutConfig.displayRows * layoutConfig.cardsInRow;
  }

  if (width > 540 && width < 768) {
    layoutConfig = { displayRows: 4, cardsInRow: 2, layout: 'medium' };
    layoutConfig.initialAmount = layoutConfig.displayRows * layoutConfig.cardsInRow;
  }
  if (width <= 540) {
    layoutConfig = { displayRows: 5, cardsInRow: 2, layout: 'narrow' };
    layoutConfig.initialAmount = layoutConfig.displayRows;
  }
  return layoutConfig;
};
