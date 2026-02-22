import React, { useState,useCallback, useMemo } from "react";
interface ChildProps {
  onClick: () => void
  items: number[]
}

export default function Parent(){
      const [count,setCount] = useState(0);
      const handleClick = useCallback(()=>{
            setCount((prev=>prev+1))
      },[]);

      console.log('hey inside parent')
      const items = useMemo(()=>[1,2,3],[]);


      return <Child onClick = {handleClick} items = {items}/>
}


const Child = React.memo(({onClick,items}:ChildProps)=>{
    console.log('inside child')
           return <div>
              <button onClick={onClick}>{items.length}</button>
           </div>
});