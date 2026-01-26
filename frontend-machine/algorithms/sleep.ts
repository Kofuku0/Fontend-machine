


export default async function sleep(duration:number):Promise<void>{
       return new Promise((res)=>setTimeout(res,duration))
}