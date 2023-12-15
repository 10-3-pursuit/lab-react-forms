import "./Form.css";
import { useState } from "react";

function Form() {

  const [numbersArray, setNumbersArray] = useState([]);
  const [operation, setOperation] = useState();

  const handleChange = (e) => {
    setNumbersArray(e.target.value.split(','))
    console.log(numbersArray)
  }
  const handleOperation = (e) => {
    setOperation(e.target.value);
    console.log(operation)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset
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
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p></p>
      </section>
    </>
  );
}

export default Form;
