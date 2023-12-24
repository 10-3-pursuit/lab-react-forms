import { useState } from "react";
import "./Form.css";

function Form() {
  const [newCalc, setNewCalc] = useState({
    numInput: "",
    operation: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (event) => {
    /* Note: spread operator (...) copy all existing key-value pairs from newCalc. Then, it updates the value of the key that matches event.target.name (either numInput or operation) with the new value from event.target.value. This is how you can update individual properties of an object in the state without losing the other properties. */
    setNewCalc({ ...newCalc, [event.target.name]: event.target.value });
  };

  const calculateResult = (numArray, operation) => {
  
    switch (operation) {
      // Evaluating the 'operation' parameter to determine which case to execute.
  
      case 'sum':
        // Case for when the operation is 'sum'.
        return numArray.reduce((acc, curr) => acc + curr, 0);
        // .reduce method to sum up all elements in numArray.
  
      case 'average':
        // Case for when the operation is 'average'.
        return numArray.length 
               ? numArray.reduce((acc, curr) => acc + curr, 0) / numArray.length 
               : 0;
        // If numArray is not empty, calculate the average:
        // Sum all elements (like in the 'sum' case) and divide by the number of elements (numArray.length).
        // If numArray is empty, return 0.
  
      case 'mode':
        // Case for when the operation is 'mode'.
        const frequency = {};
        // Create an empty object to keep track of the frequency of each number.
  
        let maxFreq = 0;
        // Initialize maxFreq, which will store the highest frequency found.
  
        numArray.forEach(num => {
          // Iterate through each number in numArray.
          frequency[num] = (frequency[num] || 0) + 1;
          // Increment the frequency count for each number in the frequency object.
          // If the number doesn't exist in frequency, use 0 as the initial value.
  
          if (frequency[num] > maxFreq) {
            // Check if the current number's frequency is greater than the max frequency found so far.
            maxFreq = frequency[num];
            // If it is, update maxFreq with this new frequency.
          }
        });
  
        let modes = [];
        // Initialize an array to store the mode(s).
  
        for (let num in frequency) {
          // Iterate through each key (number) in the frequency object.
          if (frequency[num] === maxFreq) {
            // Check if the frequency of the current number is equal to maxFreq.
            modes.push(Number(num));
            // If it is, add this number to the modes array.
          }
        }
  
        return modes.length === 1 
               ? modes[0] 
               : `All inputted numbers appear with the same frequency.`;
        // If there's only one mode, return it. 
        // If not, return a message indicating all numbers appear with the same frequency.
        // This case handles when there are no modes or multiple modes.
  
        break;
        // Break statement to end the 'mode' case.
  
      default:
        // Default case for when the operation doesn't match any of the specified cases.
        return 'Invalid input.';
        // Return a message indicating the input is invalid.
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const numArray = newCalc.numInput.split(',').map(num => Number(num.trim()));
    const calculatedResult = calculateResult(numArray, newCalc.operation);
    setResult(calculatedResult);
  };

  const reset = () => {
    setNewCalc({ numInput: "", operation: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={newCalc.numInput} name="numInput" type="text" />
        <select onChange={handleChange} value={newCalc.operation} name="operation">
          <option value=""></option>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        {/* no need to make a result component to export / import because useState is already here with the data needed which is just the outputs of operation functions */}
        {result}
      </section>
    </>
  );
}

export default Form;