import { useState } from "react"



export function Count(props) {
    const { value } = props
    const [count, setCount] = useState(value);
    
    
    const plus = () => {
        setCount(count + 1)
    }

    const minus = () => {
        setCount(count - 1)
    }

    return (
        <>
            <div>{count}</div>
            <button onClick={plus}>+</button>
            <button onClick={minus}>-</button>


        </>
    )
};



