import './CustomIframe.css';

import { useEffect, useState } from 'react';

export default function CustomIframe({
  isIframeShowed,
  setIsIframeShowed,
  movieLink,
  setMovieLink
}) {
  const [id, setId] = useState(false);

  useEffect(() => {
    if (movieLink !== null && movieLink !== undefined) {
      const startIndex = movieLink.indexOf('=') + 1;
      const embedId = movieLink.slice(startIndex);
      setId(embedId);
    }
  }, [movieLink]);

  const hideIframe = () => {
    setIsIframeShowed(false);
    document.body.style.overflow = 'visible';
    setMovieLink('');
  };

  return isIframeShowed ? (
    <div className="custom-iframe" onClick={hideIframe}>
      <div className="custom-iframe__wrapper">
        <iframe
          className="custom-iframe__video"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          onClick={e => {
            e.stopPropagation();
          }}
        ></iframe>
        <button className="custom-iframe__close-button"></button>
      </div>
    </div>
  ) : null;
}
