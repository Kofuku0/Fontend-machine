
import { useEffect ,useRef} from "react"

type useTimeoutProps = {
      cb: ()=>void;
      delay:number;
}
export default function useTimeout({cb,delay}){
    
    const ref = useRef<()=>void>(cb);
     ref.current = cb;

    useEffect(()=>{
        
       const timerId =  setTimeout(()=>ref.current(),delay);

       return ()=>{
         if(timerId) clearTimeout(timerId);
       }
    },[delay])
}