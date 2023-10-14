import { useState, useEffect } from "react";
import "./Rick-and-Morty.css";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.click ? "#fff" : "#000")};
  color: ${(props) => (props.click ? "#000" : "#fff")};
`;

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
        <Button
          click={view === "characters"}
          onClick={() => {
            setView("characters");
          }}
        >
          Characters
        </Button>
        <Button
          click={view === "episodes"}
          onClick={() => {
            setView("episodes");
          }}
        >
          Episodes
        </Button>
        <Button
          click={view === "locations"}
          onClick={() => {
            setView("locations");
          }}
        >
          Locations
        </Button>
      </div>

      <div className="wrap__window">
        {view === "characters"
          ? data.map((i) => {
              return (
                <div className="card">
                  <p>
                    <span>id: </span>
                    <span>{i.id}</span>
                  </p>
                  <p>
                    <span>Name:</span>
                    <span> {i.name}</span>
                  </p>
                  <p>
                    <span>Status:</span>
                    <span> {i.status}</span>
                  </p>
                  <p>
                    <span>Species: </span>
                    <span>{i.species}</span>
                  </p>
                  <p>
                    <span>Type: </span>
                    <span>{i.type}</span>
                  </p>
                  <p>
                    <span>Gender: </span>
                    <span>{i.gender}</span>
                  </p>
                  <p>
                    <span>Origin:</span>
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
                  <p>
                    <span>id: </span>
                    <span>{i.id}</span>
                  </p>
                  <p>
                    <span>Name: </span>
                    <span>{i.name}</span>
                  </p>
                  <p>
                    <span>Air Date: </span>
                    <span>{i.air_date}</span>
                  </p>
                  <p>
                    <span>Episode: </span>
                    <span>{i.episode}</span>
                  </p>
                  <p>
                    <span>Season: </span>
                    <span>{i.season}</span>
                  </p>
                </div>
              );
            })
          : null}

        {view === "locations"
          ? data.map((i) => {
              return (
                <div className="card">
                  <p>
                    <span>id: </span>
                    <span>{i.id}</span>
                  </p>
                  <p>
                    <span>Name: </span>
                    <span>{i.name}</span>
                  </p>
                  <p>
                    <span>Type: </span>
                    <span>{i.type}</span>
                  </p>
                  <p>
                    <span>Dimension: </span>
                    <span>{i.dimension}</span>
                  </p>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
