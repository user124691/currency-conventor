import React, {useReducer} from "react"
import "./styles.css"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  ADD_OPERATOR: 'add-operator',
  EVALUATE: 'evaluate',
  DELETE_ONE: 'delete-one',
  DELETE_ALL: 'delete-all'
}

function evaluate({currentOperand, previousOperand, operation}){
  let curr = parseFloat(currentOperand)
  let prev = parseFloat(previousOperand)
  if(isNaN(curr) || isNaN(prev)) return
  let computation = ''
  switch(operation){
    case "+": 
      computation = prev + curr
      break
    case "-": 
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "/":
      computation = prev / curr
      break
    default:
      break
  }
  return computation.toString()
}

function reducer(state, {payload, type}){
  switch(type){
      case ACTIONS.ADD_DIGIT: 
        if(payload.digit === "0" && state.currentOperand === "0"){
          return state
        }
        if(payload.digit === "." && state.currentOperand == null){
          return state
        }
        if(payload.digit === "." && state.currentOperand.includes(".")){
          return state
        }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ''}${payload.digit}`
        }
      case ACTIONS.ADD_OPERATOR:
        if(state.operation && state.currentOperand == null) {
          return{
            ...state,
            operation: payload.operation
          }
        }
        if(state.previousOperand && state.operation && state.currentOperand){
          return {
            previousOperand: evaluate(state),
            operation: payload.operation,
            currentOperand: null
          }
        }
        return {
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null
        }
      case ACTIONS.EVALUATE: 
        if(state.currentOperand == null || state.previousOperand == null || state.operation == null) return state
        if(state.previousOperand && state.currentOperand){
            return{
              currentOperand: evaluate(state),
              previousOperand: null,
              operation: null
            }
        } 
      case ACTIONS.DELETE_ONE:
        if(state.currentOperand == null) {
          return state
        }
        if(state.currentOperand.length < 1) {
          return state
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
      case ACTIONS.DELETE_ALL: 
        return {
          state: {}
        }
  }
}


function App(){
const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return(
    <div className="calculator-grid">
      <div className="output">
        <div className="output-previous">{previousOperand} {operation}</div>
        <div className="output-current">{currentOperand}</div>
      </div>
      <button onClick={() => {dispatch({type: ACTIONS.DELETE_ALL})}} className="span-two">AC</button>
      <button onClick={() => {dispatch({type: ACTIONS.DELETE_ONE})}}>DEL</button>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="/" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button onClick={() => dispatch({type: ACTIONS.EVALUATE})} className="span-two">=</button>
    </div>
  )
}

export default App;