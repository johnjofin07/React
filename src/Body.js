import { useState } from "react"
function Calculator() {
    const [inOne, setOne] = useState(0)
    const [inTwo, setTwo] = useState(0)
    const [result, setResult] = useState(0)
    function inputOne(e) {
        setOne(Number(e.target.value))
    }
    function inputTwo(e) {
        setTwo(Number(e.target.value))
    }
    function plus() {
        setResult(inOne + inTwo)
    }
    function minus() {
        setResult(inOne - inTwo)
    }
    function divide() {
        setResult(inOne / inTwo)
    }
    return (
        <div className="Calculator">
            <input onChange={inputOne} placeholder='Number' type='text' />
            <input onChange={inputTwo} placeholder='Number' type='text' />
            =
            <span className="result"> {result}</span>
            <div className="operations">
                <button className="btn__calc" onClick={() => plus()} >+</button>
                <button onClick={minus} > - </button >
                <button onClick={divide}>/</button>
                <button onClick={() => (setResult(inOne * inTwo))}>*</button>
            </div>
        </div>
    )


}

export default Calculator;
