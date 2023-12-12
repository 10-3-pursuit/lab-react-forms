import React from "react";
import { useState } from "react";
import Result from "./Result"
import "./Form.css";




function Form() {
  const [newCalc, setNewCalc] = useState ({
    numInput: [],
    sum: 0,
    average: 0,
    mode: 0,
  })

  const [nums, setNums] = useState([])

  const handleChange = (event) => {
    console.log(event.target.id, event.target.value)
    setNewCalc({...newCalc, [event.target.id]: event.target.value })
  }
// draft 2
  const handleSubmit = (e) => {
    e.preventDefault();
    const numArray = newCalc.numInput.split(',').map(num => Number(num.trim()));

    // Calculating sum, average, or mode based on the selected operation
    let result;
    switch (newCalc.operation) {
        case 'sum':
            result = numArray.reduce((acc, curr) => acc + curr, 0);
            break;
        case 'average':
            result = numArray.length ? numArray.reduce((acc, curr) => acc + curr, 0) / numArray.length : 0;
            break;
        case 'mode':
            break;
        default:
            result = 0;
    }

    setNewCalc({
        ...newCalc,
        sum: result,
        // Add average and mode properties probably
    });
    setNums([numArray, ...nums]);
    reset();
}

  // const handleSubmit = (e) => {
  //   {/* might need a switch statement/ ternary/ or conditional to get either sum, avg, or mode and iterating using .reduce or .map() */}
  //   const numArray = newCalc.numInput.split(',').map(num => Number(num.trim()));
  //   const sum = newCalc.sum;
  //   e.preventDefault();
  //   setNums([numArray, ...nums]);
  //   reset();
  // }
const reset = () => {
  setNewCalc({
    numInput: [],
    sum: 0,
    average: 0,
    mode: 0,
  })
}


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={newCalc.numInput} id="values" name="values" type="text" />
        <select id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>
          {/* {syntax on next line is correct but commented out so I can fix the component fx} */}
          {/* <Result result={nums} newCalc={newCalc}/> */}
        </p>
      </section>
    </>
  );
}

export default Form;