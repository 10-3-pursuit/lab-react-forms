import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  // the data type of the initital value has to be consistent
  // should not change the data type while using state
  const [numInput, setNumInput] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // function for the change within the input box that turns the number into an array
  const handleChange = (event) => {
    //  update the initial string to what is input by the user
    setNumInput(event.target.value);
  };

  const handleOperation = (event) => {
    setOperation(event.target.value);
  };

  // function for the calculate button
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log to check if the inputs are stored to the state variables
    // console.log(numInput.split(","));
    // console.log(operation);

    // call the helper function inside of the handleSubmit
    calculate(numInput, operation);
  };

  // calculation function
  const calculate = (numInput, operator) => {
    const filteredNums = numInput.split(",").filter((num) => num.trim() !== "");
    // console.log(`filtered array:`, filteredNums);
    if (
      !filteredNums.length ||
      filteredNums.some((num) => typeof +num !== "number")
    ) {
      // use console.log to help with the debugging
      // console.log(`Invalid input`);
      alert("Invalid Input");
      return;
    }

    let newResult = 0;
    if (operator === "sum") {
      // create a variable to save the calculation to that way we could use it to update the result state
      // Use .reduce() to get the total sum of the array
      newResult = filteredNums.reduce((acc, curr) => acc + +curr, 0);
      // console.log(newResult);
      // setResult to update the state and add the variable we used to save the calculation to
    } else if (operator === "average") {
      newResult =
        filteredNums.reduce((acc, curr) => acc + +curr, 0) /
        filteredNums.length;
    } else if (operator === "mode") {
      let modeObj = {};
      // set the most frequent value to the first element in the array
      let mostFrequent = filteredNums[0];
      let highestFrequency = 1;

      filteredNums.forEach((num) => {
        // [1, 3, 3]
        // mostFreq  = 1 highestFreq = 1 num = 1
        //1:1
        //3:1
        //3:2
        if (modeObj[num]) {
          modeObj[num]++;
          if (modeObj[num] > highestFrequency) {
            highestFrequency = modeObj[num];
            mostFrequent = num;
          }
        } else {
          modeObj[num] = 1;
        }
      });
      newResult = mostFrequent;
    }

    setResult(newResult);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          id="values"
          name="values"
          type="text"
          value={numInput}
        />

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
