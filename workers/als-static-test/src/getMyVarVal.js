const myVarVal = process.env['my-var'];
console.log(`(( the value is ${myVarVal} ))`);

export const getMyVarVal = () => {
    return myVarVal;
}