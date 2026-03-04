


import React,{useState,useEffect,useRef} from 'react';

const AutoComplete = () => {
  const [value,setValue] = useState('');
  const [debouncedValue,setDebouncedValue] = useState('');
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const [products,setProducts] = useState([]);
  const [result,setResult] = useState('');
  const [index,setIndex] = useState(-1);
  const cachedRef = useRef<Record<string,any[]>>({});
  const [loading,setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController|null>(null);
  const containerRef = useRef<HTMLDivElement|null>(null);


  const BUFFER_ITEMS = 5;
  const END = 5 + BUFFER_ITEMS;
  const [points,setPoints] = useState({
     start:0,
     end:END
  })
  const slicedData = products.slice(points.start,points.end)


 
  useEffect(()=>{
     
    if(value.trim()===''){
        setProducts([]);
        setDebouncedValue('');
          return;
    }
    if(timerRef.current){
          clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(()=>setDebouncedValue(value),300);
    

    return ()=>{
         if(timerRef.current){
          clearTimeout(timerRef.current);
    }
    }
      
  },[value])


  // after 300ms if value changes then make call


  // now store the result in the cache





  useEffect(()=>{
    if(debouncedValue.trim()===''){
          return;
    }

     if(cachedRef.current[debouncedValue]){
     console.log('from cached')
     setProducts(cachedRef.current[debouncedValue])
     return ;
  }

    if(abortControllerRef.current){
          abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    

         const fetchData = async()=>{
               
               try{
                  setLoading(true);
                  const res = await fetch(`https://dummyjson.com/products?q=${debouncedValue}`,{
                     signal: controller.signal
                  })
                  const data = await res.json();
                  setProducts(data.products);
                  cachedRef.current[debouncedValue] = data.products;
               }catch(err:any){
                  if(err.name=='AbortError'){
                     return;
                  }
                  console.error(err)
               }finally{
                setLoading(false);
               }
         }

         fetchData();


         return ()=>{
              if(abortControllerRef.current){
                abortControllerRef.current.abort();
              }
         }
  },[debouncedValue])


  const handleChange = (e:any)=>{
      setValue(e.target.value)
  }

  const onHandlekeyDown = (e)=>{
    const key = e.key;
    if(products.length==0){
          return;
    }
    if(key=='ArrowUp'){
         setIndex(prev=>{
              return Math.max((prev-1),-1);
         })
    }

    if(key=='ArrowDown'){
          setIndex(prev=>{
              return (prev+1) % products.length
          })
    }
    if(key=='Enter'){
        
        if(index !==-1){
          setResult(products[index]?.title);
          setProducts([]);
        } 
        
    }

  }


  const clickOutside = (e:MouseEvent)=>{
    
    
       if(containerRef.current && !containerRef.current.contains(e.target as Node)){
        console.log('hyyy')
           setProducts([]);
       }
  }

  useEffect(()=>{
   window.addEventListener('click',clickOutside);
   return ()=>window.removeEventListener('click',clickOutside)
  },[])

 // adding virtualisation 
  const handleTop = (e:any)=>{
     console.log(e,"scroll")
      const top = e.target.scrollTop;
      console.log(top,"toppp")
      const startIndex = Math.ceil(top/40);
      setPoints({
          start:startIndex,
          end:startIndex+END
      })
      

  }


  return (
    <div>
     deboubced Value : {debouncedValue}
     --value: {value}

     ---result: {result}
         <div ref = {containerRef} className='relative w-[300px] bg-red-500 m-10 rounded-xl'>
             <input
             onKeyDown={onHandlekeyDown}
             type='text'
             placeholder='search for the item'
             value  ={value}
             onChange = {handleChange}
             className='block bg-white/10 w-full  rounded-xl px-3 placeholder:px-2 border-2 border-blue-500'
              />

              <div onScroll={handleTop} className='absolute top-7 px-3 overflow-y-auto max-h-[300px] bg-green-500 w-full rounded-xl '>
                <div style={{height:products.length*40}} className='relative'>
                     {products.length >0 && !loading && (
                     slicedData.map((prod:any,ix:number)=>{
                      return (
                          <div key ={`${prod.id}-${ix}`} style={{top:`${(points.start+ix)*40}px `}}  className={`h-[40px] absolute  ${index==ix?'border-black border-2':'border-none'}`}>{prod.title}</div>
                      )
                })
                )}
                </div>
               
                
              </div>

           
         </div>
    </div>
  )
}

export default AutoComplete