// we will understand the promises in deep 

import { TelemetryPlugin } from "next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin";

// run this in js complier
function uploadFile(file){
      return new Promise((res,rej)=>{
            setTimeout(()=>{
                  res(`Uploded: ${file}`)
            },1000)
      })
}



// abobe one havimg function to upload 
// Task: const files = ["a.png", "b.png", "c.png"];


// Upload the files one by one sequentially and log results in order.


const files = ["a.png", "b.png", "c.png"];


async function uploadAll(files){
      try{
        //    for(const file of files){
        //        const res = await uploadFile(file);// one by one call synchronously as it is having await
              
        //         console.log(res);
        //    }
        
        // to make parallely call
        const promises = files.map(file => uploadFile(file));
        const results = await Promise.all(promises);
        console.log(results);
      }catch(err){
            console.log(err);
      }
}