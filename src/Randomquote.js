import { useState, useEffect } from "react";

export function Quote() {
  const [quote, setQuote] = useState("");
  const [change, setChange] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async (q) => {
      const res = await fetch("https://api.quotable.io/quotes/random", {
        method: "GET",
      });
      const data = await res.json();
      setQuote(data[0]);



      setLoading(false);
    })();
  }, [change]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <button
            onClick={() => {
              setChange(change + 1);
            }}
          >
            Change
          </button>
          <div>Quote of the Day: {quote.content}</div>
          <div>Author: {quote.author}</div>
        </>
      )}
    </>
  );
}
