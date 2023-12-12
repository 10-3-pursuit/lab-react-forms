import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {

  const [newNumbers, setNewNumbers] = useState([])
  const [operation, setOperation] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")


  function handleChange(event){
    const inputValue = event.target.value
    const numbersArray = inputValue.split(",")
    setNewNumbers(numbersArray)
    setError("")

  }

  function handleOperation(event){
    setOperation(event.target.value)
  }

  function calculateResult(newNumbers, operation){
    const filteredNumbers = newNumbers.filter((number) => number.trim() !== "")
    if(filteredNumbers.some((number) => isNaN(number)) || filteredNumbers.length === 0){
      setError("Invalid input.")
      return null
    } else if(operation === "sum"){
      const sum = filteredNumbers.reduce((acc, current) => {
        return acc + parseInt(current)
      }, 0)
      return sum
    } else if(operation === "average"){
      const mean = filteredNumbers.reduce((acc, current) => {
        return acc + parseFloat(current)
      }, 0) / filteredNumbers.length 
      return mean
    } else if(operation === "mode"){
      const count = filteredNumbers.reduce((acc, current) => {
        if(!acc[current]){
          acc[current] = 1
        } else {
          acc[current] = acc[current] + 1
        }
        return acc
      }, {})
      const highestCount = Math.max(...Object.values(count))
      const mode = Object.keys(count).find(key => count[key] === highestCount)
      return mode
    }
  }

  function handleSubmit(event){
    event.preventDefault()
    setError("")
    const newResult = calculateResult(newNumbers, operation)
    if(newResult !== null){
      setResult(newResult)
      reset()
    }
  }

  function reset(){
    setNewNumbers([])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
        onChange={handleChange}
        value={newNumbers}
        id="values" 
        name="values" 
        type="text" />
        <select 
        onChange={handleOperation}
        value={operation}
        id="operation" 
        name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{error ? error : result}</p>
      </section>
    </>
  );
}

export default Form;
