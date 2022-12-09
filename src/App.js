import React, {useState, useEffect} from "react"
import "./styles.css"
import CurrSelect from "./UI/CurrSelect"
import CurrInput from "./UI/CurrInput"

function App(){
  const [firstCurr, setFirstCurr] = useState("UAH")
  const [firstInp, setFirstInp] = useState(0)
  const [secondCurr, setSecondCurr] = useState("UAH")
  const [secondInp, setSecondInp] = useState(0)

  async function headerUpdate(headerCurr, setHeaderCurr){
    
  }

  function calculate(firstCurr, firstInp, secondCurr, secondInp){
    if(firstCurr === secondCurr){
      return
    }
    fetch(`https://v6.exchangerate-api.com/v6/25c6b5bb64b328584e1f91bb/latest/${firstCurr}`)
    .then(res => res.json())
    .then((data) => {
        setSecondInp((data.conversion_rates[secondCurr]) * firstInp)
    })
}

  function changeCurr(firstCurr, secondCurr){
       let temp = firstCurr;
       setFirstCurr(secondCurr)
       setSecondCurr(temp);
  } 

  return (
    <div className="App">
      <div className="header">
          <h2 className="nameHeader">Online Currency Conventer</h2>
      </div>
      <div className="content">
        <CurrSelect 
          value={firstCurr}
          onChange={setFirstCurr}
          options={[{value: "UAH", name: "UAH"}, {value: "EUR", name: "EUR"}, {value: "USD", name: "USD"}]}>
        </CurrSelect>
        <CurrInput value={firstInp} onChange={setFirstInp}></CurrInput>
        <button id="changeArrow" onClick={() => changeCurr(firstCurr, secondCurr)}>&rarr;</button>
        <CurrSelect 
          value={secondCurr}
          onChange={setSecondCurr}
          options={[{value: "UAH", name: "UAH"}, {value: "EUR", name: "EUR"}, {value: "USD", name: "USD"}]}>

        </CurrSelect>
        <CurrInput value={secondInp}></CurrInput>
        <div>
          <button id="convertButton" onClick={() => calculate(firstCurr, firstInp, secondCurr, secondInp)}>Convert</button>
        </div>
      </div>
    </div>
  )
}

export default App;