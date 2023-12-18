import React, { useState } from 'react';

function Form() {
  const [numbersInput, setNumbersInput] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

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

  const handleInputChange = (event) => {
    setNumbersInput(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const numbersArray = numbersInput.split(',').map(num => parseFloat(num.trim()));

    if (numbersArray.some(isNaN)) {
      setResult('Invalid input.');
      return;
    }

    const selectedOperation = operations[operation];

    if (selectedOperation) {
      setResult(selectedOperation());
    } else {
      setResult('Invalid operation.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter numbers (comma-separated):
        <input type="text" value={numbersInput} onChange={handleInputChange} />
      </label>

      <label>
        Select operation:
        <select value={operation} onChange={handleOperationChange}>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
        </select>
      </label>

      <button type="submit">Calculate</button>

      <div>
        <strong>Result:</strong> {result}
      </div>
    </form>
  );
}

export default Form;

