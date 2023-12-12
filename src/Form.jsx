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
    calculateResult();
    console.log("result:", result);
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

  const calculateResult = () => {
    const numbers = [];
    for (const value of numbersAndOp.values) {
      const n = Number(value.trim());
      if (isNaN(n)) {
        alert("Invalid input.");
        return null;
      }
      numbers.push(n);
    }
    
    const operation = numbersAndOp.operation;
    if (!operation) {
      alert("Invalid input.");
      return null;
    }

    if (numbers.length > 0) {
      let newResult = null;
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
          // const counts = {};
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
      setResult(newResult);
    } else {
      alert("Invalid input.");
      return null;
    }
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <input
        onChange={handleInputChange}
        value={numbersAndOp.values.join(",")}
        id="values" name="values" type="text" />
        <select
          onChange={handleInputChange}
          id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result && ("Result: " + result)}</p>
      </section>
    </>
  );
}

export default Form;
