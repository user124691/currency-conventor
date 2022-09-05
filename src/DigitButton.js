import {ACTIONS} from "./App"

export default function DigitButton({digit, dispatch}){
    return <button onClick={() => dispatch({payload: {digit}, type: ACTIONS.ADD_DIGIT})}>{digit}</button>
}