//Making some variables global for easy access throughout the program
let a=0;
let b=0;
let c=0;
let d=0;
let e=0;
let lst = [];
let lstA = [];
let lstB = [];

//Function to perform arithmetic operations
function performOperation(var1, var2, operator) {
    if (operator === '+') {
        return (var1 + var2);
    }
    else if (operator === '*') {
        return var1 * var2;
    }
    else if (operator === '-') {
        return (var1 - var2);
    }
}

//Function that returns value of expression after evaluation
function evaluate(expression) {
    //Stack to store values of the expression
    let valueStack = [];
    //stack to store operators
    let operatorStack = [];
    let i = 0;
    while (i < expression.length) {
        if(expression[i]===' '){ //        //if current token is a whitespace, skip it
            i=i+1;
            continue;
        }
        else if(expression[i]==='-' && (/^\d+$/.test(expression[i+1]))){  //if current token is a negative number
            i=i+1;
            let val=0;
            while((i < expression.length) && (/^\d+$/.test(expression[i]))){
                val = (val*10)+parseInt(expression[i]);
                i=i+1;
            } 
            val = val*(-1);
            valueStack.push(val);
            //right now the i points to the character next to the digit, since the for loop also increases
            //the i, we would skip one token position; we need to decrease the value of i by 1 to correct
            //the offset
            i=i-1;
        }      
       else if (expression[i] === '{' || expression[i] === '*' || expression[i] === '+' || expression[i] === '-') { //if operator then push on top of the operator stack
            operatorStack.push(expression[i]);
            i = i + 1;
            continue;
        }
        //Check token is a number, push it to stack of Values
        else if (/^\d+$/.test(expression[i])) { 
            let str = "";
            //Accumulating each individual token and making a Digit. Takes care of Decimal numbers too
            while (((i < expression.length) && (/^\d+$/.test(expression[i])) || (i<expression.length)&&(expression[i]==='.'))){
                str = str+expression[i];
                i = i + 1;
            }
            valueStack.push(Number(str));
            //right now the i points to the character next to the digit, since the for loop also increases
            //the i, we would skip one token position; we need to decrease the value of i by 1 to correct
            //the offset
            i = i - 1;
        }
        //Checking if current token is a variable
        else if(expression[i]==='a' || expression[i]==='b' || expression[i]==='c' || expression[i]==='d' || expression[i]==='e'){
            if(expression[i]==='a'){
                valueStack.push(a);
            }
            else if(expression[i]==='b'){
                valueStack.push(b);
            }
            else if(expression[i]==='c'){
                valueStack.push(c);
            }
            else if(expression[i]==='d'){
                valueStack.push(d);
            }
            else if(expression[i]==='e'){
                valueStack.push(e);
            }
        }
        //if closing brace encountered, solve the entire brace
        else if (expression[i] === '}') { 
            while(operatorStack.length!==0 && (operatorStack[operatorStack.length-1]!=='{')){
                let var1 = valueStack.pop();
                let var2 = valueStack.pop();
                let operator = operatorStack.pop();
                valueStack.push(performOperation(var1,var2,operator));
            }   
            operatorStack.pop();    
        }
        
        i += 1; 
    }
    //Entire expression has been parsed at this point, apply remaining operators to the remaining values 
    while(operatorStack.length !== 0){
        let val2 = valueStack.pop();
        let val1 = valueStack.pop();
        let operator = operatorStack.pop();
        valueStack.push(performOperation(val1, val2, operator));
    }
    return valueStack[0];
}

function createList(lst){
    for(let i=0;i<lst.length-2;i++){
        let str1="";
        let str2="";
        let j=0;
        while(lst[i][j]!="?"){
            str1 = str1 + lst[i][j];
            j++; 
        }
        j++;
        lstA.push(Number(str1));
        while(j<lst[i].length){
            str2 = str2+lst[i][j];
            j++;
        }
        lstB.push(Number(str2));
    }
}

function ternary(string){ 
    lst = string.split(",");
    createList(lst); //Creates two lists A and B
    let lastNumber=0;
    lastNumber = lst[lst.length-1]; //The final answer if all the results are false
    let i=0;
    while(i<lstA.length){   
        if(a<lstA[i]){ 
            return lstB[i];
        }
        i++;
    }
    return Number(lastNumber);
}

function solve(arr){
    a = evaluate(arr[0]);
    b = ternary(arr[1]);
    c = evaluate(arr[2]);
    d = evaluate(arr[3]);
    e = evaluate(arr[4]);
    f = evaluate(arr[5]);
    return [a,b,c,d,e,f];  
}

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
start()