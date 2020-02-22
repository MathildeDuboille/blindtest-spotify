/*global swal*/

import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import AlbumCover from "./AlbumCover";
import Sound from 'react-sound';
import Button from "./Button";

const apiToken = 'BQD5SQUPz2PtL1ezCCcxWbG0w4toReui99OfJCGXPMp2nZzTJee6MAFntM9vKfDxfBtbhK9tw-sYvQzqhzU2ZOGyH8_QQ5Lwl6tn_WVhQ8d7Jkrih4_V-kFT9i-SA12inybZcrQMCgkeFx6BNwBUE_o2wr1vlRb9661xQmK8FknSGg';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState(null);
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  let timeout;
  useEffect(() => {
    fetch('https://api.spotify.com/v1/playlists/1wCB2uVwBCIbJA9rar5B77/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data.items);
        setTracks(data.items);
        setCurrentTrack(data.items[getRandomNumber(data.items.length)].track);
        setSongsLoaded(true);
      })
  }, []);

  useEffect(() => {
    timeout = setTimeout(getNewTrack, 30000)
  });

  const checkAnswer = (id) => {
    if (currentTrack && currentTrack.id === id) {
      swal('Bravo', 'Sous-titre', 'success').then(() => getNewTrack());
    } else {
      swal('Alerte !!', 'Ceci est une alerte', 'error')
    }
  };
  console.log(tracks);

  const getNewTrack = () => {
    tracks && setCurrentTrack(tracks[getRandomNumber(tracks.length)].track)
  };

  if (!songsLoaded) {
    return <img src={logo} className="App-logo" alt="logo"/>
  }

  const track1 = currentTrack;
  const track2 = tracks[getRandomNumber(tracks.length)].track;
  const track3 = tracks[getRandomNumber(tracks.length)].track;
  const tracksButton = shuffleArray([track1, track2, track3]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue</h1>
      </header>
      <div className="App-images">
        <p>Track length : {tracks[0].track.name}</p>
      </div>
      <AlbumCover currentTrack={currentTrack} />
      <Sound url={currentTrack.preview_url} playStatus={Sound.status.PLAYING}/>
      <div className="App-buttons">
        {tracksButton.map(track => <Button onClick={() => checkAnswer(track.id)}>{track.name}</Button>)}
      </div>
    </div>
  );
}

export default App;
