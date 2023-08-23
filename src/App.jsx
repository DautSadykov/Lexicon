import React, { useEffect, useState } from "react";
import axios from "axios";
import nextId from "react-id-generator";

import { useSelector, useDispatch } from "react-redux";
import { setDefinitions } from "./features/definition/definitionSlice";
import { setRequestWord } from "./features/reqWordKeeper/requestWord";

export default function App() {
  const wordToFind = useSelector((state) => state.reqWord.value)
  const definitions = useSelector((state) => state.definition.value);

  const fetchWord = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFind}`
      );
      dispatch(setDefinitions(res.data[0].meanings));
    } catch (err) {
      dispatch(setRequestWord(null))
      dispatch(setDefinitions([]))
      alert("there is no definition for that word");
    }
  };

  useEffect(() => {
    wordToFind && fetchWord();
  }, [wordToFind]);

  const output =
    definitions &&
    definitions.map((meaning) => {
      return (
        <div key={nextId()} className="word_description">
          <h2>{wordToFind}</h2>
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
        dispatch(setDefinitions([]))
        dispatch(setRequestWord(null))
      }
      dispatch(setRequestWord(e.target.value))
      console.log(1)
      document.getElementById("reqWordSetter").value = "";
    }
  }

  const dispatch = useDispatch();

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
