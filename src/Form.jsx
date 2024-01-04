import { useState } from "react";
import "./Form.css";

function Form() {
  const [numValues, setNumValues] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setNumValues(event.target.value);
  };

  const handleOptionSwitch = (event) => {
    setSelectedOption(event.target.value);
  };

  const getSum = () => {
    const nums = numValues.split(",").map((num) => parseFloat(num));

    switch (selectedOption) {
      case "sum":
        setResult(nums.reduce((acc, num) => acc + num, 0));
        break;
      case "average":
        setResult(nums.reduce((acc, num) => acc + num, 0) / nums.length);
        break;
      case "mode":
        const numMap = {};
        let maxNum = 0;
        let mode = null;

        nums.forEach((num) => {
          numMap[num] = (numMap[num] || 0) + 1;

          if (numMap[num] > maxNum) {
            maxNum = numMap[num];
            mode = num;
          }
        });

        setResult(mode);
        break;
      default:
        setResult("select an operation");
    }
    if ( typeof numValues !== "number") {
      alert("Only number are allowed")
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 

    getSum();
  };

  return (
    <>
      <form className="form-num">
        <input id="values" name="values" type="text" onChange={handleInputChange} className="nums-enter" />
        <select id="operation" name="operation" onChange={handleOptionSwitch}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit" onClick={handleSubmit}>Calculate</button>
        <div>
          <p className= "nums-display">{result}</p>
        </div>
      </form>
      <section id="result">
        <p></p>
      </section>
    </>
  );
}

export default Form;