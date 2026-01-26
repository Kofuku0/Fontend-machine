/* Question:1 
Implement a function makeCounter that accepts an optional integer value and returns a function. 
 When the returned function is called initially, it returns the initial value if provided, otherwise 0. 
 The returned function can be called repeatedly 
 to return 1 more than the return value of the previous invocation.*/

/* const counter = makeCounter();
 counter(); // 0
 counter(); // 1
 counter(); // 2 */


 // Closure based Questions and high order functions



 export default function makeCounter(initValue:number=0):()=>number{
  let val = initValue;
   

    return ()=>{
          return val++;
    }
 }

const counter = makeCounter(1);

console.log(counter());//1
console.log(counter());//2
console.log(counter());//3
console.log(counter());//4


