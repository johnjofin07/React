import { useEffect, useState } from "react";
import styles from "./CoffeeList.module.css";

import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.selected ? "#411B00" : "#FFD4B5")};
  color: ${(props) => (props.selected ? "#FFD4B5" : "#411B00")};
`;

const SelectButton = styled.button`
  background: ${(props) => (props.cardSelection ? "#FFD4B5" : "#411B00")};
  color: ${(props) => (props.cardSelection ? "#411B00" : "#FFD4B5")};
  border: solid 2px ${(props) => (props.cardSelection ? "#411B00" : "#FFD4B5")} !important;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.active ? "#411B00" : "#FFD4B5")};
  color: ${(props) => (props.active ? "#FFD4B5" : "#411B00")};
`;

const Card = styled.div`
  background: ${(props) => (props.CardFocus ? "#411B00" : "#FFD4B5")};
  color: ${(props) => (props.CardFocus ? "#FFD4B5" : "#411B00")};
`;
export function Coffee() {
  const [coffee, setCoffee] = useState(null);
  const [search, setSearch] = useState("Coffee");
  const [result, setResult] = useState([]);
  const [view, setView] = useState("normal");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://api.sampleapis.com/coffee/hot", {
        method: "GET",
      });
      const coffee = await res.json();
      const modified = coffee.map((i) => {
        return { ...i, selection: false };
      });

      setCoffee(modified);
      setResult(modified);
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (!e.target.value) {
      setResult(coffee);
      return;
    }

    const filterValue = result.filter((item) => {
      return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setResult(filterValue);
  };

  const handleSelect = (id) => {
    const newValue = result.map((i) => {
      if (i.id === id) {
        return { ...i, selection: !i.selection };
      }
      return i;
    });

    setResult(newValue);
  };

  return (
    <div className={styles.wrap__coffee}>
      <div className={styles.search}>
        <input type="text" placeholder="search name" onChange={handleSearch} />
      </div>
      <div className={styles.btns__coffee}>
        <Button
          selected={search === "Coffee"}
          onClick={() => {
            setSearch("Coffee");
          }}
        >
          Coffee
        </Button>
        <Button
          selected={search === "Espresso"}
          onClick={() => {
            setSearch("Espresso");
          }}
        >
          Espresso
        </Button>
        <Button
          selected={search === "Milk"}
          onClick={() => {
            setSearch("Milk");
          }}
        >
          Milk
        </Button>
      </div>
      <div className={styles.filter__btn}>
        <FilterButton
          active={view === "filtered"}
          onClick={() => {
            setView("filtered");
          }}
        >
          Slected Only
        </FilterButton>
        <FilterButton
          active={view === "normal"}
          onClick={() => {
            setView("normal");
          }}
        >
          Show All
        </FilterButton>
      </div>
      {view === "filtered" ? (
        <div className={styles.wrap__card}>
          {result
            .filter((i) => {
              return i.selection === true;
            })
            .map((i) => {
              return (
                <Card CardFocus={i.selection === true} className={styles.card}>
                  <img src={i.image} alt={i.title} width={300} height={350} />

                  <h2> {i.title}</h2>

                  <p>{i.description}</p>

                  <SelectButton
                    onClick={() => handleSelect(i.id)}
                    selectedCard={i.id}
                  >
                    {i.selection ? "selected" : "select"}
                  </SelectButton>
                </Card>
              );
            })}{" "}
        </div>
      ) : (
        <div className={styles.wrap__card}>
          {result
            .filter((c) => {
              return c.ingredients.includes(search);
            })
            .map((i) => {
              return (
                <Card CardFocus={i.selection === true} className={styles.card}>
                  <img src={i.image} alt={i.title} width={300} height={350} />

                  <h2> {i.title}</h2>

                  <p>{i.description}</p>

                  <SelectButton
                    cardSelection={i.selection === true}
                    onClick={() => handleSelect(i.id)}
                  >
                    {i.selection ? "selected" : "select"}
                  </SelectButton>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
}
