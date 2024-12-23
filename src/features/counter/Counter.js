// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment
    , decrement
    , reset
    , incrementByAmount
} from './counterSlice';
import { useState } from 'react';

const Counter = () => {
    const count = useSelector( ( state ) => state.counter.count );
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState( 0 );
    const addValue = Number( incrementAmount ) || 0;
    const resetAll = () => {
        setIncrementAmount( 0 );
        dispatch( reset() );
    };
    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch( increment() )}>+</button>
                <button onClick={() => dispatch( decrement() )}>-</button>
                <br />
                <input
                    type="text"
                    value={incrementAmount}
                    onChange={( e ) => setIncrementAmount( e.target.value )}
                />
                <div className="by-amount">
                    <button onClick={() => dispatch( incrementByAmount( addValue ) )}>Add Value</button>
                    <button onClick={resetAll}>Reset</button>
                </div>
            </div>
        </section>
    );
};

export default Counter;
