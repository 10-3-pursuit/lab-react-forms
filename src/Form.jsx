import React from "react";
import "./Form.css";

function Form({newNumbers, operation, handleChange, handleOperation}) {
  return (
    <>
      <form>
        <input 
        onChange={handleChange}
        value={newNumbers}
        id="values" 
        name="values" 
        type="text" />
        <select 
        onChange={handleOperation}
        value={operation}
        id="operation" 
        name="operation">
          <option value=""></option>
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
