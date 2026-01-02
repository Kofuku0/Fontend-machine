
'use client'
import React ,{useState} from 'react'

const index = () => {

const Height = 600;
const data = Array.from({length:1000}).map((_,index)=>`Item ${index+1}`); 




const ITEM_HEIGHT = 50;
const BUFFER_ITEMS  = 2;

const VISIBLE_ITEMS = Math.ceil(Height/ITEM_HEIGHT)+BUFFER_ITEMS;

const [range,setRange] = useState({start:0,end:VISIBLE_ITEMS});

const handleScroll = (e:any)=>{
     console.log(e.target.scrollTop);
     const {scrollTop} = e.target;
     const newStartIndex = Math.floor(scrollTop/ITEM_HEIGHT);
     const endIndex = newStartIndex + VISIBLE_ITEMS;
        setRange({start:newStartIndex,end:endIndex});
}
const visibleData = data.slice(range.start,range.end);

console.log(range.start,"staret index");
  return (

    <div className='w-full h-screen flex flex-col items-center justify-center overflow-y-auto'>
        
        <div onScroll={handleScroll} className='bg-gray-500 h-125 w-55 text-center overflow-y-auto'>
                 <div className='relative'  style={{height: data.length * ITEM_HEIGHT, }} > 
                     {visibleData.map((item,index)=>(
                    <div key={index} style={{top: (range.start+ index) * ITEM_HEIGHT}} className='border-b absolute h-12.5 border-gray-300 p-2'>
                        {item}
                    </div>
                   ))}
                 </div>
                  
           
            </div>
            
    </div>
  )
}

export default index
