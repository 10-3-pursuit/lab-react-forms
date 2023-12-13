import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [info, setInfo] = useState({
    arrayOfNums: '',
    operation: ''
  })
  const [result, setResult] = useState(0)
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState('')

  const validInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8','9',',']

  const isInvalid = () => {
    const copiedArrOfNums = info.arrayOfNums.split('')
    if(copiedArrOfNums.filter(char=> !validInputs.includes(char)).length > 0) {
      setResult('Invalid input.') 
      setIsValid(false)
      setError('error')
    } else {
      setResult(0)
      setIsValid(true)
      setError('')
    }
  }

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value
    })
    isInvalid()
  }
  
  const handleOperation = () => {
    const copiedArrOfNums = info.arrayOfNums.split(',')
    if(copiedArrOfNums.length > 0) {
      if(info.operation === 'sum') {
        return copiedArrOfNums.reduce((acc, cur)=>acc + parseInt(cur), 0)
      } else if(info.operation === 'average') {
        return copiedArrOfNums.reduce((acc, cur)=>acc + parseFloat(cur), 0)/copiedArrOfNums.length
      } else {
        const count = {}
        copiedArrOfNums.forEach((num)=> { 
          count[num] ? count[num] = count[num] + 1 : count[num] = 1
        })
        const mode = Object.keys(count).find(key=> count[key] === Math.max(...Object.values(count)))
        return mode
      }
    }
  }

  const reset = () => {
    if(isValid === true) {
      setInfo({
        arrayOfNums: '',
        operation: ''     
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setResult(handleOperation())
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className={error} onChange={handleChange} value={info.arrayOfNums} id='arrayOfNums' name="arrayOfNums" type="text" />
        <select className={error} onChange={handleChange} value={info.operation} id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  )
}

export default Form;
