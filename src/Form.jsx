import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValues, setInputValues] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setInputValues(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const calculateResult = () => {
    const numbers = inputValues.split(",").map((num) => Number(num));

    if (numbers.some(isNaN) || inputValues.trim() === "") {
      setResult("Invalid input.");
      return;
    }

    switch (operation) {

      case "sum":
        setResult(numbers.reduce((acc, val) => acc + val, 0));
        break;
        
      case "average":
        setResult(
          numbers.reduce((acc, val) => acc + val, 0) / numbers.length
        );
        break;

      case "mode":
        const frequencyMap = {};
        let maxFrequency = 0;
        let modes = [];
  
        numbers.forEach((num) => {
          frequencyMap[num] = (frequencyMap[num] || 0) + 1;
          if (frequencyMap[num] > maxFrequency) {
            maxFrequency = frequencyMap[num];
            modes = [num];
          } else if (frequencyMap[num] === maxFrequency) {
            modes.push(num);
          }
        });
        //if theres no mode it wants to return a 1 in the intructions
        if (maxFrequency === 1) {
          setResult("1");
        } else {
          setResult(modes.join(", "));
        }
        break;

      default:
        setResult("Invalid operation.");
        break;
    }
  };

  return (
    <>
      <form onSubmit={(e) => {e.preventDefault(); calculateResult(); }}>
        <input 
         id="values"
         name="values"
         type="text" 
         value={inputValues}
         onChange={handleInputChange}
        />
        <select
         id="operation" 
         name="operation"
         value= {operation}
         onChange={handleOperationChange}
        >
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
