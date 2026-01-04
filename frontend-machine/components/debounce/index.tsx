'use client';
import React, { useEffect }  from 'react'
import useDebounce from '@/frontend-machine/hooks/useDebounce';
interface ProductProps{
     id:number;
     title:string
}

const index = () => {
    const [searchTerm,setSearchTerm] = React.useState("");
    const [data,setData] =  React.useState<ProductProps[]|null>([]);
    const handleChange = (e:any)=>{
        setSearchTerm(e.target.value);
    }
 
    const debouncedSearchTerm = useDebounce({searchTerm,duration:500});

    useEffect(()=>{
        if(debouncedSearchTerm.trim()==='') return;

        const fetchData= async ()=>{
           const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}&limit=10`);
           const ans = await res.json();
           console.log(ans,"ans")
           setData(ans.products);
        }
        fetchData()

    },[debouncedSearchTerm])

  return (
    <div className='w-full flex flex-col items-center justify-center '>
   

      <input
      type="text"
      placeholder="enter the text"
      onChange = {handleChange}
      className='border border-gray-300 rounded-md p-2 mt-5 w-100'/>

     <div className='p-2'>Serach {searchTerm} Results</div>
     <div>
         {data?.map((i,ix)=>{
             return <div key={ix}>
                  {i.title}
                </div>
         })}
     </div>
    </div>
  )
}

export default index


//  items= await  fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}`);