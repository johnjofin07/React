import { useState, useEffect } from "react";
import "./Rick-and-Morty.css";
export function RickMorty() {
  const [view, setView] = useState("characters");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.sampleapis.com/rickandmorty/${view}`,
        {
          method: "GET",
        }
      );
      const fetchData = await res.json();
      setData(fetchData);
    }
    fetchData();
  }, [view]);

  const [data, setData] = useState([]);

  return (
    <>
      <div className="btns__selection">
        <button
          onClick={() => {
            setView("characters");
          }}
        >
          Characters
        </button>
        <button
          onClick={() => {
            setView("episodes");
          }}
        >
          Episodes
        </button>
        <button
          onClick={() => {
            setView("locations");
          }}
        >
          Locations
        </button>
      </div>

      <div className="wrap__window">
        {view === "characters"
          ? data.map((i) => {
              return (
                <div className="card">
                  <p>
                    <span>ID: </span>
                    <span>{i.id}</span>
                  </p>
                  <p>
                    <span>NAME:</span>
                    <span> {i.name}</span>
                  </p>
                  <p>
                    <span>STATUS:</span>
                    <span> {i.status}</span>
                  </p>
                  <p>
                    <span>SPECIES: </span>
                    <span>{i.species}</span>
                  </p>
                  <p>
                    <span>TYPE: </span>
                    <span>{i.type}</span>
                  </p>
                  <p>
                    <span>GENDER: </span>
                    <span>{i.gender}</span>
                  </p>
                  <p>
                    <span>ORIGIN:</span>
                    <span> {i.origin}</span>
                  </p>
                  <img src={i.image} alt={i.name} width={200} height={200} />
                </div>
              );
            })
          : null}

        {view === "episodes"
          ? data.map((i) => {
              return (
                <div className="card">
                  <div>{i.id}</div>
                  <div>{i.name}</div>
                  <div>{i.air_date}</div>
                  <div>{i.episode}</div>
                  <div>{i.season}</div>
                </div>
              );
            })
          : null}

        {view === "locations"
          ? data.map((i) => {
              return (
                <div className="card">
                  <div>{i.id}</div>
                  <div>{i.name}</div>
                  <div>{i.type}</div>
                  <div>{i.dimension}</div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
