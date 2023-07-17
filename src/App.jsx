import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import nextId from "react-id-generator";


export default function App() {
  const [reqWord, setReqWord] = useState(null);
  const [wordData, setWordData] = useState(null);
  const fetchQuotes = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${reqWord}`
      );
      setWordData(res.data[0].meanings);
    } catch (err) {
      setReqWord(null)
      setWordData(null)
      console.error(err);
    }
  };

  useEffect(() => {
    reqWord && fetchQuotes();
  }, [reqWord]);

  const output =
    wordData &&
    wordData.map((meaning) => {
      return (
        <div key={nextId()} className="word_description">
          <h2>{reqWord}</h2>
          <div className="partOfSpeech">{meaning.partOfSpeech}</div>
          <ol>
            {meaning.definitions.map((definition) => {
              return (
                <li key={nextId()}>
                  <div>
                    <span>{definition.definition}</span>
                    {definition.example && <i>{definition.example}</i>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      );
    });


  function handleReqWordChange(e) {
    if (e.key === "Enter") {
      if (!e.target.value) {
        setReqWord(null)
        setWordData(null)
      }
      setReqWord(e.target.value);
      document.getElementById('reqWordSetter').value = '';
    }
  }

  return (
    <main>
      <div className="header">
        <h1>Lexicon</h1>
      </div>
      <div className="input_section">
        <input
          type="text"
          id="reqWordSetter"
          placeholder='Put any word here and press "Enter"'
          onKeyDown={handleReqWordChange}
        />
      </div>
      <div className="word_desc_section">{output}</div>
    </main>
  );
}
