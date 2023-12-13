import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  const [numInput, setNumInput] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // function for the change within the input box that turns the number into an array
  const handleChange = (event) => {
    setNumInput(event.target.value.split(","));
  };

  const handleOperation = (event) => {
    // console.log(handleOperation);
    setOperation(event.target.value);
  };

  // function for the calculate button
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // calculation function
  const calculate = (numInput, operator) => {
    const filteredNums = numInput.filter((num) => num.trim() !== "");

    if (
      filteredNums.every(
        (num) => typeof num !== "number" || !filteredNums.length
      )
    ) {
      setErrorMessage("Invalid Input");
    }

    if (operator === "sum") {
      result = filteredNums.reduce((acc, curr) => +acc + +curr, 0);
    } else if (operator === "average") {
      result =
        filteredNums.reduce((acc, curr) => +acc + +curr, 0) /
        filteredNums.length;
    } else if (operator === "mode") {
      let modeObj = {};
      let mostFrequent = 0;

      filteredNums.forEach((num) => {
        if (modeObj[num]) {
          modeObj[num]++;
        } else {
          modeObj[num] = 1;
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} id="values" name="values" type="text" />
        <select onChange={handleOperation} id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
