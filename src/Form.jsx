import React, { useState } from "react";
import "./Form.css";

function Form() {
  const formObject = {
    values:"",
    operation:""
  }

  const [form, setForm] = useState(formObject)
  const [error, setError] = useState(false)
  const [solution, setSolution] = useState(null)

  function handleChange(event){
    setForm({...form, [event.target.id]:[event.target.value]})
  }

  function handleSubmit(event){
    event.preventDefault()
    const errorChecker = errorCheck()

    if(errorChecker){
      const newNumArr = form.values[0].split(",").map(input=>{
        if(Number(input)){
          return Number(input)
        }else{
          return "ERROR"
        }
      })
      setError(false)
      const operation = form.operation[0]
      findSolution(operation,newNumArr)
      reset()
    }else{
      setError(true)
      setSolution(null)
    }
  }
  function errorCheck(){
    if(!form.values){
      return false
    }
    const inputArr = form.values[0].split(",")
    const convertedToNums = inputArr.map(input=>{
      if(Number(input)){
        return Number(input)
      }else{
        return "ERROR"
      }
    })
    if(convertedToNums.every(num=> !isNaN(num)) && convertedToNums.length > 1 && form.operation){
      return true
    }else{
      return false
    }
  }
  function findSolution(operation,numbers){
    if(operation === "sum"){
      setSolution(numbers.reduce((acc,num)=> acc+num))
    }else if(operation==="mode"){
      setSolution( +Object.entries(
        numbers.reduce((acc, num) => ((acc[num] = (acc[num] || 0) + 1), acc), {})
      ).reduce((mode, [key, value]) => (value > mode[1] ? [key, value] : mode), [null, 0])[0])
    }else{
      setSolution(numbers.reduce((acc,num)=>acc+num) / numbers.length)
    }
  }

  function reset(){
    setForm(formObject)

  }

  return (
    <>
      <form>
        <input className={error ? "error":null}
        onChange={handleChange}
        value={form.values}
        id="values" 
        name="values" 
        type="text" />
        <select className={error ? "error":null}
        onChange={handleChange} 
        value={form.operation}
        id="operation" 
        name="operation"
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button onClick={handleSubmit} type="submit">Calculate</button>
        {error ? <p>Invalid Input.</p>:null}
        {solution && <p>{solution}</p>}
      </form>
      <section id="result">
        <p></p>
      </section>
    </>
  );
}

export default Form;
