import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [numbersAndOp, setNumbersAndOp] = useState({
    values: [],
    operation: ""
  });
  const [result, setResult] = useState(null);

  const formSubmit = (e) => {
    e.preventDefault();
    const calculation = calculateResult();
    setResult(calculation);
    calculation !== 'Invalid input.' && formReset();
  }

  const handleInputChange = (e) => {
    const id = e.target.id;
    if (id === 'values') {
      const newValues = e.target.value.split(",");
      setNumbersAndOp(currentVal => {
        return {
          ...currentVal,
          [id]: newValues
        }
      })
    } else {
      setNumbersAndOp(currentVal => {
        return {
          ...currentVal,
          [id]: e.target.value
        }
      })
    }
  }

  const formReset = () => {
    setNumbersAndOp({
      values: [],
      operation: ""
    })
  }

  const calculateResult = () => {
    const operation = numbersAndOp.operation;
    if (!operation) {
      return "Invalid input.";
    }

    const numbers = [];
    for (const value of numbersAndOp.values) {
      const trimmedVal = value.trim();
      if (trimmedVal === "") {
        continue;
      }
      const n = Number(trimmedVal);
      if (isNaN(n)) {
        return "Invalid input.";
      }
      numbers.push(n);
    }

    let newResult = null;
    if (numbers.length > 0) {
      switch (numbersAndOp.operation) {
        case "sum":
          newResult = numbers.reduce((acc, curr) => acc + curr, 0);
          break;
        case "average":
          newResult = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
          break;
        case "mode":
          const counts = numbers.reduce((acc, curr) => {
            if (Object.keys(acc).includes(curr)) {
              acc[curr] = acc[curr] + 1;
            } else {
              acc[curr] = 1;
            }
            return acc;
          }, {});
          newResult = numbers[0];
          let highestCount = counts[numbers[0]];
          for (const num in counts) {
            const nextCount = counts[num];
            if(nextCount > highestCount) {
              highestCount = nextCount;
              newResult = num;
            }
          }
          break;
        default:
          break;
      }
      return newResult;
    } else {
      return "Invalid input.";
    }
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <input
        onChange={handleInputChange}
        value={numbersAndOp.values.join(",")}
        className={result === 'Invalid input.' ? "error" : ""}
        id="values" name="values" type="text" />
        <select
          onChange={handleInputChange}
          value={numbersAndOp.operation}
          className={result === 'Invalid input.' ? "error" : ""}
          id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result && (typeof result === 'number' ? ("Result: " + result) : result)}</p>
      </section>
    </>
  );
}

export default Form;
