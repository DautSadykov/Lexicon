import React from "react";
import { useSelector } from "react-redux";
import nextId from "react-id-generator";

export default function Definitions() {

  const definitions = useSelector((state) => state.definition.value);
  const wordToFind = useSelector((state) => state.reqWord.value)

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


  return (
    <>
      <div className="word_desc_section">{output}</div>
    </>
  );
}
