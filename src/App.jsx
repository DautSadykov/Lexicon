import React, { useEffect, useState } from "react";
import axios from "axios";

import { Routes, Link, Route, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setDefinitions } from "./features/definition/definitionSlice";
import { setRequestWord } from "./features/reqWordKeeper/requestWord";

import Definitions from "./routes/Definition";
import Synonyms from "./routes/Synonyms";

export default function App() {
  const wordToFind = useSelector((state) => state.reqWord.value);

  const dispatch = useDispatch();
  const location = useLocation();


  const fetchWord = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFind}`
        );
        dispatch(setDefinitions(res.data[0].meanings));
    } catch (err) {
      dispatch(setRequestWord(null));
      dispatch(setDefinitions([]));
      alert(`there is no definition for "${wordToFind}"`);
    }
  };

  useEffect(() => {
    wordToFind && fetchWord();
  }, [wordToFind]);

  function handleReqWordChange(e) {
    if (e.key === "Enter") {
      if (!e.target.value) {
        dispatch(setDefinitions([]));
        dispatch(setRequestWord(null));
      }
      dispatch(setRequestWord(e.target.value));
      document.getElementById("reqWordSetter").value = "";
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
      <div className="mode-selector-section">
        <Link to="/definitions">
          <button
            className={
              location.pathname === "/definitions" ? "active" : ""
            }
          >
            Definitions
          </button>
        </Link>
        <Link to="/synonyms">
          <button
            className={location.pathname === "/synonyms" ? "active" : ""}
          >
            Synonyms
          </button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/definitions" element={<Definitions />} />
        <Route path="/synonyms" element={<Synonyms />} />
      </Routes>
    </main>
  );
}
