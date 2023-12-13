import React from "react";
import "./Form.css";

function Form({submit, handleInputChange, handleOpChange}) {
  return (
    <>
      <form onSubmit={submit}>
        <input onChange={handleInputChange}id="values" name="values" type="text" />
        <select onChange={handleOpChange} id="operation" name="operation">
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
