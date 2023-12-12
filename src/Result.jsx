const Result = ({ nums, newCalc }) => {
    // newCalc.sum is the initial value for the sum
    const initialSumValue = newCalc && newCalc.sum ? newCalc.sum : 0;
    // Use .reduce() to calculate the sum of elements in the 'nums' array, starting with 'initialSumValue'

    const sum = nums.reduce((acc, curr) => acc + curr, initialSumValue);

    return (
        <p>{sum}</p>
    );
};

export default Result;

// can use .map here with result id from Form.jsx