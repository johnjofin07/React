import { useState } from "react";

export function Search() {
  const arrayObj = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      city: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      city: "Los Angeles",
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 35,
      city: "Chicago",
    },
    {
      id: 4,
      name: "Alice Brown",
      age: 28,
      city: "San Francisco",
    },
  ];

  const [result, setResult] = useState(arrayObj);

  function nameChange(e) {
    setResult(
      arrayObj.filter((item) =>
        item.name.toLowerCase().includes(e.target.value)
      )
    );

    console.log(result);
  }


  return (
    <>
      <input  onChange={nameChange} placeholder="search name" type="text" />

      {result.map((i) => {
        return (
          <>
            <div>{i.id}</div>
            <div>{i.name}</div>
            <div>{i.age}</div>
            <div>{i.city}</div>
          </>
        );
      })}
    </>
  );
}
