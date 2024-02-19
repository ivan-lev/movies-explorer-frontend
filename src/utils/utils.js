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

export const displayCardsUtil = () => {
  const displayCards = {};

  if (window.innerWidth >= 768) {
    displayCards.displayRows = 4;
    displayCards.cardsInRow = 3;
    displayCards.layout = 'wide';
    displayCards.initialAmount = displayCards.displayRows * displayCards.cardsInRow;
  }

  if (window.innerWidth > 540 && window.innerWidth <= 768) {
    displayCards.displayRows = 4;
    displayCards.cardsInRow = 2;
    displayCards.layout = 'medium';
    displayCards.initialAmount = displayCards.displayRows * displayCards.cardsInRow;
  }
  if (window.innerWidth <= 540) {
    displayCards.displayRows = 5;
    displayCards.cardsInRow = 2;
    displayCards.layout = 'narrow';
    displayCards.initialAmount = displayCards.displayRows;
  }
  return displayCards;
};
