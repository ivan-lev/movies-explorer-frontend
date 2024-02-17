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

export const displayCardsAmount = () => {
  const windowInnerWidth = window.innerWidth;
  const displayCards = {
    count: 0,
    initialAmount: 0
  };

  if (windowInnerWidth >= 768) {
    displayCards.count = 3;
    displayCards.initialAmount = 4 * 3;
  }

  if (windowInnerWidth > 540 && windowInnerWidth <= 768) {
    displayCards.count = 2;
    displayCards.initialAmount = 4 * 2;
  }
  if (windowInnerWidth <= 540) {
    displayCards.count = 2;
    displayCards.initialAmount = 5 * 1;
  }
  return displayCards;
};
