import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  // state for user input
  const [userInput, setuserInput] = useState("");
  // state for options
  const [optionState, setOptionState] = useState("");
  const [result, setResult] = useState("");
  // expecting number comma number format
  //put value of input into array
  //add all values in array together if option is sum
  return (
    <>
      <form>
        <input
          id="values"
          name="values"
          type="text"
          value={userInput}
          onChange={(input) => {
            setuserInput(input.target.value);
            console.log(input.target.value);
          }}
        />
        <select
          id="operation"
          name="operation"
          onChange={(input) => {
            setOptionState(input.target.value);
            console.log(input.target.value);
          }}
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button
          type="button"
          onClick={() => {
            let inputArr = userInput.split(",").map(Number);

            if (optionState === "sum") {
              setResult(
                inputArr.reduce((acc, val) => {
                  return acc + val;
                }, 0)
              );
            } else if (optionState === "average") {
              setResult(
                inputArr.reduce((acc, val) => {
                  return acc + val;
                }, 0) / inputArr.length
              );
            } else if (optionState === "mode") {
              let mostCommonValue;
              setResult(
                // the following code was taken from chatgpt because finding the most commonly occuring value in an array is way more work than it's worth

                (mostCommonValue = inputArr.reduce(
                  (acc, val, _, arr) =>
                    arr.filter((v) => v === val).length > acc[1]
                      ? [val, arr.filter((v) => v === val).length]
                      : acc,
                  [null, 0]
                )[0])
              );
              //end of borrowed code
            } else if (optionState === "") {
              setResult("Please pick something from the dropdown.");
            }
            if (!userInput.includes(",")) {
              setResult(
                "Please put commas in between your numbers... or any numbers at all."
              );
            }
          }}
        >
          Calculate
        </button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
