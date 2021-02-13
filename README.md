# FormulaParser
Given an input formula string. Using JavaScript, parse the input and return an array containing values of all the variables in the string.  
Example Input (Array):  
function start() {
 let a = "5";
 let b = "3?0,4?10,20";
 let c = "-10";
 let d = "{a*b}+c";
 let e = "d*b*0.01";
 let f = "a+b+c+d+e";

 let answerArray = solve([a, b, c, d, e, f]);

 console.log(answerArray);
}

// Your function
function solve(arr) {
 // Your code here
 // return the answer array [a, b, c, d, e, f]
}

start();


Example Output (Array):  [5, 20, -10, 90, 18, 123]
