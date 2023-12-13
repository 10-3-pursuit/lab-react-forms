import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {

  const [inputValue, setInputValue] = useState({
    numbers:"",
    operation:""
  });

  const [total, setTotal] = useState(0);

  function handleChange(event) {
    setInputValue({...inputValue, [event.target.id]: event.target.value});
  }

  function calculateTotal() {
    // convert numbers into an array
    const arr = inputValue.numbers.split(",").map(Number);

    if(inputValue.operation === "sum"){
      const sum = arr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      setTotal(sum)
    }
    
    else if(inputValue.operation === "average"){
      const sum = arr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      },0);
      const average = sum/arr.length || 0;
      setTotal(average);
    }
    else if(inputValue.operation === "mode"){
      const mode = calculateMode();
      setTotal(mode);
    }
  }

  function calculateMode() {
    const arr = inputValue.numbers.split(",").map(Number);
  
    const frequencyMap = {};
    let maxFrequency = 0;
    let mode = [];
  
    arr.forEach((number) => {
      frequencyMap[number] = (frequencyMap[number] || 0) + 1;
      if (frequencyMap[number] > maxFrequency) {
        maxFrequency = frequencyMap[number];
        mode = [number];
      } else if (frequencyMap[number] === maxFrequency) {
        mode.push(number);
      }
    });
  
    if (mode.length === arr.length) {
      return "No mode";
    }
  
    return mode.join(", ");
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    calculateTotal();
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValue.numbers} id="numbers" name="numbers" type="text" />
        <select onChange={handleChange} value={inputValue.operation} id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{total}</p>
      </section>
    </>
  );
}

export default Form;
