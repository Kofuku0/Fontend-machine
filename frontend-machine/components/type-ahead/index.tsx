
// auto complete also 

import {useState,useEffect,useRef} from 'react'
import useDebounce from '@/frontend-machine/hooks/useDebounce';
const Typeahead= () => {
  const [query,setQuery] = useState('');
  const [results,setResults] = useState<any[]>([]);
  const debouncedQuery = useDebounce({searchTerm:query,duration:300});
 const [selectedIndex,setSelectedIndex] = useState(-1);

  useEffect(()=>{
     setSelectedIndex(-1);
  },[results])

console.log(selectedIndex,"selected index")

  const handleKeyDown = (e:React.KeyboardEvent)=>{
          if(e.key=='ArrowDown'){
              setSelectedIndex((prev=>Math.min((prev+1)%(results.length),results.length-1)));

          }else if(e.key=='ArrowUp'){
              setSelectedIndex((prev=>Math.max(prev-1,-1)));
          }else if(e.key==='Enter'){
               // could add some logic here to navigate to the selected item or fill the input with the selected item
               return;
          }else if(e.key === 'Escape'){
               setSelectedIndex(-1);
               setResults([]);
          }else{
             return;
          }
  }

  const cache = useRef<Record<string, any[]>>({});
  console.log(cache,"cache")
 

  useEffect(()=>{
    
    

    if(!debouncedQuery.trim()){
         return;
    }

    if(cache.current[debouncedQuery]){
        console.log('fetching from cache')
          setResults(cache.current[debouncedQuery]);
          return;
    }
     const abortController = new AbortController();
     const {signal} = abortController;

      const fetchData = async()=>{
           try{
              const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}&limit=10`,{signal});
              const result = await res.json();
                cache.current[debouncedQuery] = result.products;
              setResults(result.products);
             

           }catch(err:any){
              
              if(err.name!=='AbortError'){
                  console.log(err)
              }
           }
      }
    // setTimeout(() => fetchData(), 300);

    
     fetchData();

     return ()=>{
      
               abortController.abort();
         
     }
  },[debouncedQuery])


  return (
    <div className='text-white p-4'>
        hey
        <div>
             <input  onKeyDown={handleKeyDown} type='text' className='bg-black mt-2 text-white p-2 border-white border-2 rounded-md' value={query} onChange = {(e)=>setQuery(e.target.value)} />
        </div>
          <ul>
              {results.map((item:any,i:number)=>{
                    return <li key={item.id}  style={{
      background: i === selectedIndex ? '#333' : 'transparent',
      cursor: 'pointer',
      padding: '4px 8px'
    }}>{item.title}</li>
              })}
          </ul>
    </div>
  )
}

export default Typeahead
