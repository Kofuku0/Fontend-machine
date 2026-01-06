import React, { useState,useRef,useEffect } from "react";
const numberOfInputs = 6;
const index = () => {
  const [inputArr, setInputArr] = useState(new Array(numberOfInputs).fill(""));
  const inputRefArr = useRef< (HTMLInputElement| null)[]>([]);

  const handleChange=({e,ix}:any)=>{
        const {key} = e;
        const copyInputFields = [...inputArr];
        console.log(key,"key")
        if(key=='ArrowRight'){
              inputRefArr.current[(ix+1)%inputArr.length]?.focus()
        }
    if(key=='ArrowLeft'){
          if(ix>0) inputRefArr.current[ix-1]?.focus()
        else inputRefArr.current[inputArr.length-1]?.focus();
    }
        if(key=='Backspace' && copyInputFields[ix]!=''){
             
             console.log('inside')
             copyInputFields[ix] = '';
             setInputArr(copyInputFields);
             if(ix>0) inputRefArr.current[ix-1]?.focus()
        }
    
        if(isNaN(key)) return;
             copyInputFields[ix] = key;
             setInputArr(copyInputFields);
             if(ix+1 <inputArr.length) inputRefArr.current[ix+1]?.focus()
        
  }

  useEffect(()=>{
       if(inputRefArr.current ==null){
          return;
       }
       inputRefArr.current[0]?.focus();
  },[])

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();

  const pastedData = e.clipboardData.getData('text').slice(0, numberOfInputs);

  if (!/^\d+$/.test(pastedData)) return;

  const newArr = [...inputArr];

  pastedData.split('').forEach((char, index) => {
    newArr[index] = char;
  });

  setInputArr(newArr);

  inputRefArr.current[pastedData.length - 1]?.focus();
};

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex items-center justfiy-center gap-2">
        {inputArr.map((i, ix) => {
          return <input  onPaste={handlePaste} ref={(currentElement)=>{inputRefArr.current[ix]=currentElement}} onKeyDown={(e)=>handleChange({e,ix})}  className="border-2 border-gray-500 flex text-center  h-15 w-15" key={ix} value={i} readOnly></input>;
        })}
      </div>
    </div>
  );
};

export default index;



