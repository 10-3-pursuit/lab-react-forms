import React from "react";
import {useState} from "react";
import "./Form.css";

function Form() {
  const [result, setResult] = useState('')

  const [newNumbers, setNewNumbers] = useState({
    numbers: [],
    dropDown: "",
  })

  function handleChange(event) {
    setNewNumbers({ ...newNumbers, numbers: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (newNumbers.numbers.length === 0 || newNumbers.dropDown === ""){
      setResult('Invalid input.')
      return
    }

    const numbersArr = newNumbers.numbers
      .split(',')
      //NOTE: "Number" is needed, because strings can be concatenated with "+" and mess up calculation. Ensures "+" is only used for addition.
      .map((num) => Number(num.trim()))

    if (numbersArr.some(isNaN)) {
      setResult('Invalid input.')
      return
    }

    let sum = 0

    numbersArr.forEach((num) => {
      sum += num
    })

    let resultValue

    if (newNumbers.dropDown === 'sum') {
      resultValue = sum
    } else if (newNumbers.dropDown === 'average') {
      const average = sum / numbersArr.length
      resultValue = isNaN(average) ? '' : average
    } else if (newNumbers.dropDown === 'mode') {
      resultValue = findMode(numbersArr)
    } else {
      resultValue = ''
    }

    setResult(resultValue)
    reset()
  }

  function findMode(arr) {
    const frequency = {}
    let maxFrequency = 0
    let modes = []
  
    arr.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1
  
      if (frequency[num] > maxFrequency) {
        maxFrequency = frequency[num]
        modes = [num]
      } else if (frequency[num] === maxFrequency) {
        modes.push(num)
      }
    })
  
    // If no numbers in the modes array, there is no mode. If multiple numbers in the modes array, there is more than one mode.
    return modes.length === arr.length || modes.length === 0 ? 'No mode' : modes.join(', ')
  }


  function handleDropdownChange(event) {
    setNewNumbers({ ...newNumbers, dropDown: event.target.value })
  }

  function reset () {
    setNewNumbers({
      numbers: [],
      dropDown: "",
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}
          value={newNumbers.numbers} 
          id="values" 
          name="values" 
          type="text" 
        />
        <select
          value={newNumbers.dropDown}
          onChange={handleDropdownChange}
          id="operation" 
          name="operation"
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
