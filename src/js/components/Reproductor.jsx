import React, { useState, useEffect, useRef } from "react";

const Reproductor = () => {
  const [canciones, setCanciones] = useState([]);
  const [cancionActualIndex, setCancionActualIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        console.log("Canciones recibidas:", data.songs);
        if (Array.isArray(data.songs)) {
          setCanciones(data.songs);
        } else {
          console.error("", data);
        }
      })
      .catch((error) => console.error("", error));
  }, []);

  const playCancion = (index) => {
    setCancionActualIndex(index);
    const selectedSong = canciones[index];
    if (selectedSong && audioRef.current) {
      console.log("Reproduciendo:", selectedSong.url);
      audioRef.current.src = `https://playground.4geeks.com${selectedSong.url}`;
      audioRef.current.play();
    }
  };

  const play = () => {
    if (audioRef.current) audioRef.current.play();
  };

  const pause = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  const next = () => {
    const newIndex = (cancionActualIndex + 1) % canciones.length;
    playCancion(newIndex);
  };

  const previous = () => {
    const newIndex =
      (cancionActualIndex - 1 + canciones.length) % canciones.length;
    playCancion(newIndex);
  };

  const subirVolumen = () => {
    if (audioRef.current && audioRef.current.volume < 1) {
      audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1);
    }
  };

  const bajarVolumen = () => {
    if (audioRef.current && audioRef.current.volume > 0) {
      audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
    }
  };

  return (
    <div className="audio-player-container">
      <h1>Mi Spotify 🎵</h1>
      <ul className="song-list">
        {Array.isArray(canciones) && canciones.length > 0 ? (
          canciones.map((song, index) => (
            <li
              key={song.id}
              onClick={() => playCancion(index)}
              className={index === cancionActualIndex ? "active" : ""}
            >
              {song.name}
            </li>
          ))
        ) : (
          <li>Cargando canciones...</li>
        )}
      </ul>

      <div className="controles">
        <button onClick={previous}>⏮️</button>
        <button onClick={play}>▶️</button>
        <button onClick={pause}>⏸️</button>
        <button onClick={next}>⏭️</button>
        <button onClick={bajarVolumen}>🔉</button>
        <button onClick={subirVolumen}>🔊</button>
      </div>

      <audio ref={audioRef}></audio>
    </div>
  );
};

export default Reproductor;
