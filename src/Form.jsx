import React, { useState } from 'react';
import "./Form.css";

function Form() {
  const [numbersInput, setNumbersInput] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    const numbersArray = numbersInput.split(',').map(num => parseFloat(num.trim()));

    if (numbersArray.some(isNaN)) {
      setResult('Invalid input.');
      return;
    }

    const operations = {
      sum: () => numbersArray.reduce((acc, num) => acc + num, 0).toString(),
      average: () => (numbersArray.reduce((acc, num) => acc + num, 0) / numbersArray.length).toString(),
      mode: () => {
        const frequencyMap = {};
        numbersArray.forEach(num => {
          frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        });

        let mode = Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
        return mode;
      },
    };

    const selectedOperation = operations[operation];

    if (selectedOperation) {
      setResult(selectedOperation());
    } else {
      setResult('Invalid input.');
    }
  };

  return (
    <div>
      <label>
        Enter numbers (comma-separated):
        <input type="text" value={numbersInput} onChange={(e) => setNumbersInput(e.target.value)} />
      </label>
      <br />
      <label>
        Choose operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
        </select>
      </label>
      <br />
      <button onClick={calculateResult}>Calculate</button>
      <br />
      <div>
        Result: {result}
      </div>
    </div>
  );
}

export default Form;
