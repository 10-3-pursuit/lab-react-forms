import "./Form.css";
import { useState } from "react";

function Form() {

  const [numbersArray, setNumbersArray] = useState([]);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState();

  const handleChange = (e) => {
    setNumbersArray(e.target.value.split(','));
  }

  const handleOperation = (e) => {
    setOperation(e.target.value);
  }

  const getSum = (numbers) => {
    return numbers.reduce((sum, n) => sum + n);
  }

  const getAverage = (numbers) => {
    return getSum(numbers) / numbers.length;
  }

  const getMode = (numbers) => {
    const numberCounts = {};
    numbers.forEach((n) => {
      numberCounts[n] === undefined ? numberCounts[n] = 1 : numberCounts[n]++;
    })
    const max = Math.max(...Object.values(numberCounts));
    return Object.keys(numberCounts).find(key => numberCounts[key] === max);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const numArray = numbersArray.map((num) => Number(num));
    if (operation === "" || numArray.some(isNaN) || numArray.length === 0) {
      setResult("Invalid Input.");
    } else {
      switch (operation) {
        case 'sum':
          setResult(getSum(numArray))
          break;
        case 'average':
          setResult(getAverage(numArray))
          break;
        case 'mode':
          setResult(getMode(numArray));
          break;
      }
      reset();
    }
  }

  const reset = () => {
    setNumbersArray([]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={numbersArray}
          id="values" name="values" type="text" />
        <select
          onChange={handleOperation}
          id="operation" name="operation">
          <option value="" hidden default >select</option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button
          type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
