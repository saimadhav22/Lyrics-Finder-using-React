import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");

  function searchLyrics() {
    if (artist === "" || song === "") {
      return;
    }
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`, {
      headers: {
        Authorization:
          "Bearer XZ5l1DYYE6PJLXl09uSqwSo00Gu0w2vbQmaVXN0lT1a7tCkpCN-UT5UonB0X4D1M",
      },
    })
      .then((res) => {
        if (res.data.error) {
          setLyrics(res.data.error);
        } else {
          setLyrics(res.data.lyrics);
        }
      })
      .catch((err) => {
        console.log(err);
        setLyrics(
          "An error occurred while fetching lyrics. Please try again later."
        );
      });
  }

  return (
    <div className="App">
      <h1>Lyrics Finder</h1>

      <input
        className="inp"
        type="text"
        placeholder="Artist name"
        onChange={(e) => {
          setArtist(e.target.value);
        }}
      />
      <input
        className="inp"
        type="text"
        placeholder="Song name"
        onChange={(e) => {
          setSong(e.target.value);
        }}
      />
      <button className="btn" onClick={searchLyrics}>
        Search
      </button>
      <hr />
      <pre>{lyrics}</pre>
    </div>
  );
}

export default App;
