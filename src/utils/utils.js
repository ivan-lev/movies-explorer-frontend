export const filterMovies = (searchQuery, movieList) => {
  const filteredByQueryMovies = movieList.filter(movie => {
    const searchQueryWords = [];
    searchQueryWords.push(...searchQuery.toLowerCase().split(' '));
    const movieTitleWords = [];
    movieTitleWords.push(
      ...movie.nameRU.toLowerCase().split(' '),
      ...movie.nameEN.toLowerCase().split(' ')
    );
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
