// Implement a function flatten that returns a newly-created array with all sub-array elements concatenated recursively into a single level.

// Examples

// Single-level arrays are unaffected.
// flatten([1, 2, 3]);
 // [1, 2, 3]

// Inner arrays are flattened into a single level.
// flatten([1, [2, 3]]); 
// [1, 2, 3]
// flatten([[1, 2],[3, 4],]);
 // [1, 2, 3, 4]

// Flattens recursively.
// flatten([1, [2, [3, [4, [5]]]]]);
 // [1, 2, 3, 4, 5]


 type ArrayValue= any| Array<ArrayValue>;


export default function flatten(value:Array<ArrayValue>):Array<any>{
    const res = [];
    const copy = value.slice();
    
    while(copy.length){
         const item = copy.shift();
         if(Array.isArray(item)){
            copy.unshift(...item);
         }else{
              res.push(item);
         }
    }
  return res;

}

function flatten2(value:Array<ArrayValue>):Array<any>{

     while(value.some(Array.isArray)){
        value = [].concat(...value);
     }

     return value;
}


// recusriev approach 


function flatten3(value:Array<ArrayValue>):Array<any>{

    return value.reduce((acc,curr)=>{
          acc.concat(Array.isArray(curr)?flatten3(curr):curr)  
    },[])
}


function flatten4(value:Array<ArrayValue>):Array<any>{
      const res = [];
      let i=0;
      while(i<value.length){
          if(Array.isArray(value[i])){
              value.splice(i,1,...value[i]);
          }else{
              res.push(value[i]);
              i++;
          }
      }
      return res;
}