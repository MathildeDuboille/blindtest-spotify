import React from 'react';


const AlbumCover = ({currentTrack}) => {
  return <img src={currentTrack.album.images[0].url} />;
};

export default AlbumCover;
