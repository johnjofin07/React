import { useState, useEffect } from "react";
import styles from "./Rick-and-Morty.module.css";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.click ? "#fff" : "#000")};
  color: ${(props) => (props.click ? "#000" : "#fff")};
`;
const Window = styled.div`
  background: ${(props) => (props.toggle ? "#fff" : "#000")};
  color: ${(props) => (props.toggle ? "#000" : "#fff")};
`;

export function RickMorty() {
  const [view, setView] = useState("characters");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(false);
      const res = await fetch(
        `https://api.sampleapis.com/rickandmorty/${view}`,
        {
          method: "GET",
        }
      );
      const fetchData = await res.json();
      setLoading(true);
      setData(fetchData);
    }
    fetchData();
  }, [view]);

  useEffect(() => {
    const localData = localStorage.getItem("toggle");
    setToggle(localData !== null ? JSON.parse(localData) : false);
  }, []);

  const handleSearch = (e) => {
    data
      .filter((i) => {
        return i.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .map((i) => {
        return (
          <>
            {loading ? (
              <div className={styles.wrap__window}>
                {view === "characters"
                  ? data.map((i) => {
                      return (
                        <div className={styles.card}>
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
                          <img
                            src={i.image}
                            alt={i.name}
                            width={200}
                            height={200}
                          />
                        </div>
                      );
                    })
                  : null}

                {view === "episodes"
                  ? data.map((i) => {
                      return (
                        <div className={styles.card}>
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
                        <div className={styles.card}>
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
            ) : (
              <div className={styles.loading}>Loading...</div>
            )}
          </>
        );
      });
  };
  return (
    <Window toggle={toggle} className={styles.window__wrap}>
      <input
        className={styles.search}
        onChange={handleSearch}
        type="text"
        placeholder="Search Name"
      />
      <div className={styles.toggle}>
        <input
          value={toggle}
          onChange={() => {
            setToggle(!toggle);
            localStorage.setItem("toggle", !toggle);
          }}
          type="checkbox"
          id="switch"
        />
        <label for="switch"></label>
      </div>
      <div className={styles.btns__selection}>
        <p>Filter By:</p>
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
      {loading ? (
        <div className={styles.wrap__window}>
          {view === "characters"
            ? data.map((i) => {
                return (
                  <div className={styles.card}>
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
                  <div className={styles.card}>
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
                  <div className={styles.card}>
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
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
    </Window>
  );
}
