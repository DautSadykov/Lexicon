import React from "react";
import { useSelector } from "react-redux";
import nextId from "react-id-generator";

export default function Synonyms() {
  const definitions = useSelector((state) => state.definition.value);
  const wordToFind = useSelector((state) => state.reqWord.value);

  const output =
    definitions &&
    definitions.map((meaning) => {
      return (
        meaning.synonyms.length > 0 && (
          <div key={nextId()} className="word_description">
            <h2>{wordToFind}</h2>
            <div className="partOfSpeech">{meaning.partOfSpeech}</div>
            <ol>
              {meaning.synonyms.map((synonym) => {
                return (
                  <li key={nextId()}>
                    <div>{synonym}</div>
                  </li>
                );
              })}
            </ol>
          </div>
        )
      );
    });

  return (
    <div>
      <div className="word_desc_section">{output}</div>
    </div>
  );
}
