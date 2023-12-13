import React, { useState } from "react";
import Form from "./Form";
import "./App.css";

function App() {
  const [valueAndOp, setValueAndOp] = useState({
    value: [],
    operation: ""
  });

  const [result, setResult] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const calculation = calculate();
    setResult(calculation);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValueAndOp((prevValue) => ({
      ...prevValue,
      value: inputValue.split(",").map((val) => val.trim()),
    }));
  };

  const handleOpChange = (e) => {
    setValueAndOp({
      ...valueAndOp,
      operation: e.target.value,
    });
  };

  const calculate = () => {
    const value = valueAndOp.value;
    const answer = document.getElementById("result");
    const p = answer.querySelector("p");
    const sum = value.map(Number).reduce((acc, curr) => acc + curr, 0);

    switch (valueAndOp.operation) {
      case 'sum':
        if (!isNaN(sum)) {
          p.innerHTML = sum;
        } else {
          p.innerHTML = `Invalid input.`;
        }
        break;
      case 'average':
        if (!isNaN(sum)) {
          p.innerHTML = sum / value.length;
        } else {
          p.innerHTML = `Invalid input.`;
        }
        break;
      case 'mode':
        let numCount = {};
        let invalidInput = false;
        for (let i = 0; i < value.length; i++) {
          const num = value[i]
          if (!isNaN(num)) {
            numCount[num] = (numCount[num] || 0) + 1;
          } else {
            invalidInput = true;
            break;
          }
        }
        if (invalidInput) {
          p.innerHTML = `Invalid input.`;
          break;
        }
        let maxCount = 0;
        let maxOccurrence;
        for (const num in numCount) {
          if (numCount[num] > maxCount) {
            maxCount = numCount[num];
            maxOccurrence = num;
          }
        }
        p.innerHTML = maxOccurrence;
        break;
      default:
        break;
    }
  };

  return (
    <main>
      <p>Enter each number in the array, separated by a ','</p>
      <Form
        submit={submit}
        handleInputChange={handleInputChange}
        handleOpChange={handleOpChange}
        result={setResult}
      />
    </main>
  );
}


export default App;
