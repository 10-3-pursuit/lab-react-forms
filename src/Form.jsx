import React from "react";
import "./Form.css";
import { useState } from "react";



function Form() {
  const [newNumbers, setNewNumbers] = useState([])
  const [operation, setOperation] = useState("")
  const [result, setResult] = useState("")
  
//const numInput = () => {};
// const [newCalc, setNewCalc] = useState ({
//   numbersInput : numInput,
//   sum: 0,
//   average: 0,
//   mode: 0
// })

// const [nums, setNums] = useState([]);
// const handleChange = (event) => {
//   const numInput = event.target.value
//   console.log(event.target.id, event.target.value)
//   setNewCalc({...newCalc, [event.target.id] : event.target.value
//   })
// }

function handleChange(event){
  const inputValue = event.target.value
  const numbersArray = inputValue.split(",")
  setNewNumbers(numbersArray)
}

function handleOperation(event){
  setOperation(event.target.value)
}

function calculateResult(newNumbers, operation){
  const filteredNumbers = newNumbers.filter((number) => number.trim() !== "")
  
  if(operation === "sum"){
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
  const newResult = calculateResult(newNumbers, operation)
  
    setResult(newResult)
  
}

// const handleSubmit = (e) => {
  //need a switch statement, ternary or conditional to get either sum, avg, or mode and iterating using .reduce()

 // For submit
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const numArray = newCalc.numInput.split(',').map(num => Number(num.trim()));
  
      // Calculating sum, average, or mode based on the selected operation
      // let result;
      // switch (newCalc.operation) {
      //     case 'sum':
      //         result = numArray.reduce((acc, curr) => acc + curr, 0);
      //         break;
      //     case 'average':
      //         result = numArray.length ? numArray.reduce((acc, curr) => acc + curr, 0) / numArray.length : 0;
      //         break;
      //     case 'mode':
      //         break;
      //     default:
      //         result = 0;
      // }
  
  //     setNewCalc({
  //         ...newCalc,
  //         sum: result,
  //         // Add average and mode properties probably
  //     });
  //     setNums([numArray, ...nums]);
  //     reset();
  // }
  
  

//   e.preventDefault();
//   setNums([newCalc, ...nums]);
//   reset();
// }
// const reset = () => {
//   setNewCalc({
//     numInput: [],
//     sum: 0,
//     average: 0,
//     mode: 0

//   })
// }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={newNumbers} id="values" name="values" type="text" />
        <select id="operation" name="operation">
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
