import React from 'react';
import { useReducer } from 'react';

const handleReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 };
    case 'DECREASE':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(handleReducer, { count: 0 });

  const handleIncrease = () => {
    dispatch({ type: 'INCREASE' });
  };

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };

  return (
    <>
      <p>{state.count}</p>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease} style={{ marginLeft: '10px' }}>
        Decrease
      </button>
    </>
  );
};

export default Counter;
