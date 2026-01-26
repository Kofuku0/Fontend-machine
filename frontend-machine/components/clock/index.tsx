'use client'
import useMounted from "@/frontend-machine/hooks/useMounted";
import { useEffect, useState } from "react";
function Hand({height=120,width=6,angle=20}){
    return (
         <div 
           style={{
        height: `${height}px`,
        width: `${width}px`,
        transform:`rotate(${angle}deg) translate(0%,-50%) `
       
      }}
         className="bg-red-500  absolute rounded-xl">
          
         </div>
    )
}

function useCurrentDate(){
       const [date,setDate] = useState(new Date());
       
       // kick off the timer
        useEffect(()=>{
             const timer = window.setInterval(()=>{
                  setDate(new Date());
             },500)

             return ()=> window.clearInterval(timer);
        },[])
     return date;
}

function padTwoDgits(num:number){
      return num >=10 ? String(num):`0${num}`;

}


export default function Index() {
  // ✅ Temporary fixed values (later connect to real time)
  const mounted = useMounted();
  const date = useCurrentDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  console.log(minutes,"minutes")
  const seconds = date.getSeconds();
  console.log(seconds,"seconds")

  let hoursAngle = hours %12;
 
  console.log(hoursAngle,"hoursAngle")
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative h-[500px] w-[500px] rounded-full border-4 border-black bg-white">
        {/* ✅ center dot */}
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
            {Array.from({length:12},(_,i)=>{
                 const angle = (i+1)*30;
                 const radius = 200;
                 const rad = (angle*Math.PI)/180;
                 const x = radius*Math.sin(rad);
                 const y = -radius*Math.cos(rad);

                return <div key ={`num${i}`}
                 style={{transform:`translate(0%,0%) translate(${x}px,${y}px)`}}
                
                className="text-[32px] absolute text-black">{i+1}</div>
          })}
            {/* ✅ Hands (put inside clock) */}
        <Hand height={120} width={10} angle={hoursAngle*30} />
        <Hand height={160} width={6} angle={minutes*6}  />
        <Hand height={190} width={3} angle={seconds*6} />
    </div>
  );
}
