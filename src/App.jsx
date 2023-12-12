import React from "react";
import { useState } from "react";
import Form from "./Form";
import "./App.css";

function App() {

  const [newNumbers, setNewNumbers] = useState([])

  function handleChange(event){
    const inputValue = event.target.value
    const numbersArray = inputValue.split(",")
    numbersArray.filter((number) => number.trim() !== "")
    setNewNumbers(numbersArray)
    console.log(numbersArray)
  }
  
  return (
    <main>
      <p>Enter each number in the array, separated by a ','</p>
      <Form newNumbers={newNumbers} handleChange={handleChange} />
    </main>
  );

}

export default App;
