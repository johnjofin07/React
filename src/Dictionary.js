import { useState, useEffect } from "react";
import styes from "./Dictionary.module.css";

export function Dictionary() {
  const [data, setData] = useState([]);
  const [word, setWord] = useState(["hello"]);
  const [search, setSearch] = useState(["welcome"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`,
        {
          method: "GET",
        }
      );
      const response = await res.json();

      setData(response);
      setLoading(false);
    }
    fetchData();
  }, [search]);

  const handleWord = (e) => {
    let inputWord = e.target.value;
    setWord(inputWord);
  };
  const searchWord = (w) => {
    setSearch(w);
  };
  return (
    <div className={styes.wrap__dictionary}>
      <div className={styes.wrap__input}>
        <h2>Dictionary!</h2>

        <input
          placeholder="Enter a Word"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchWord(word);
            }
          }}
          onChange={handleWord}
        />
        <button className={styes.btn__search} onClick={() => searchWord(word)}>
          Search
        </button>
      </div>
      {loading ? (
        "loading..."
      ) : data.title ? (
        data.title
      ) : (
        <div className={styes.card}>
          {/* {data.map((i, index) => { */}

          <>
            <div>Word: {data[0].word}</div>

            <div>
              Definition :{data[0].meanings[0].definitions[0].definition}
            </div>
          </>

          {/* })} */}
        </div>
      )}
    </div>
  );
}
