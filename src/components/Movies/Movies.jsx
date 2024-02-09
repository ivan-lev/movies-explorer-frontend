import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ moviesList, userId }) {
  return (
    <section className="main__section movies">
      <MoviesCardList moviesList={moviesList} userId={userId} />
    </section>
  );
}
