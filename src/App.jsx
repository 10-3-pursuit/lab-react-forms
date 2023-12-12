import React from "react";
import { useState } from "react";
import Form from "./Form";
import "./App.css";

function App() {

  const [newNumbers, setNewNumbers] = useState([])

  const [operation, setOperation] = useState("")

  function handleChange(event){
    const inputValue = event.target.value
    const numbersArray = inputValue.split(",")
    numbersArray.filter((number) => number.trim() !== "")
    setNewNumbers(numbersArray)
    console.log(numbersArray)
  }

  function handleOperation(event){
    console.log(event.target.value)
    setOperation(event.target.value)
  }

  return (
    <main>
      <p>Enter each number in the array, separated by a ','</p>
      <Form newNumbers={newNumbers} operation={operation} handleChange={handleChange} handleOperation={handleOperation}/>
    </main>
  );

}

export default App;
