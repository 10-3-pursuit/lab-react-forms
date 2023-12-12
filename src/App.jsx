import React from "react";
import Form from "./Form";
import "./App.css";


const calculate = (event, values) => {
  event.preventDefault();
  values = event.target.values.value
  const op = document.getElementById("operation")

  const removedComma = ','
  let numArr = values.split(removedComma).map(Number);

  const result = document.getElementById("result")
  const p = result.querySelector("p") 
  
  const sum = numArr.reduce((acc, curr) => acc + curr,0)

  switch (op.value) {
    case 'sum':
      if(!isNaN(sum)) {
        p.innerHTML = sum
      } else {
        p.innerHTML = `Invalid Input`
      }
    break;
    case 'average':
      if(!isNaN(sum)) {
        p.innerHTML = sum / numArr.length
      } else {
        p.innerHTML = `Invalid Input`
      }
    break;
    case 'mode':
      let numCount = {}
      for(let i = 0; i < numArr.length; i++) {
        const num = parseFloat(numArr[i])
        if (!isNaN(num)) {
        numCount[num] = (numCount[num] || 0) + 1;
        } else {
          return p.innerHTML = `Invalid Input`
        }
      }

      let maxCount = 0;
      let maxOccurence;
      for(const num in numCount) {
        if(numCount[num] > maxCount) {
          maxCount = numCount[num]
          maxOccurence = num 
        }
      }

      p.innerHTML = maxOccurence
    break;
    default:
      p.innerHTML = `Invalid Input`
    break;
  }
}

const reset = (event) => {
  values = event.target.values.value
  console.log(values)
}

function App() {
  return (
    <main>
      <p>Enter each number in the array, separated by a ','</p>
      <Form calculate={calculate} reset={reset}/>
    </main>
  );
}

export default App;
