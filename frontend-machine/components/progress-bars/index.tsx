

import { useEffect,useState } from "react";

function ProgressBar(){
    const [startTransition,setStartTransition] = useState(false);

    useEffect(()=>{
      
         if(startTransition) return;
         setStartTransition(true);
    })

    return (
         
           <div className="bg-blue-300 border border-black w-125 h-4 rounded-xl overflow-hidden">
  <div
    className={[
      "h-full bg-green-500 transition-all duration-2000 ease-linear",
      startTransition ? "w-full" : "w-0",
    ]
      .filter(Boolean)
      .join(" ")}
  />
</div>


         
    )

}

export default function ProgressBarGenerator(){
        const [bars,setBars] = useState<number>(0);
        return (
              <div className="flex min-h-screen items-center bg-white flex-col gap-3">
                <div className="text-black text-[20px]">{bars}</div>
                <div>
                    <button className="text-black rounded-xl px-10 mt-2 py-4 bg-blue-500 text-[22px]" onClick={()=>setBars(prev=>prev+1)}>Add</button>
                </div>
                <div className="flex flex-col gap-4">
                    {Array(bars).fill(null).map((_,index)=>(
                          <ProgressBar key ={index}/>
                    ))}
                </div>
                     


              </div>
        )
}