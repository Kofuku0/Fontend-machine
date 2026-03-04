
import {useMemo} from 'react'


interface PaginationProps {
      data: any[];
      currentPage:number;
      windowSize:number;
      totalCount:number;
      handlePageChange:(page:number)=>void;
}
const Pagination = ({data,currentPage,windowSize,totalCount,handlePageChange}:PaginationProps) => {

  

  // calculate the pages based on the limits 
 
const totalPages = useMemo(() => { return Math.ceil(totalCount / windowSize); }, [totalCount, windowSize]);


const pagesTemp = useMemo(()=>{
   
  const arr:(number| string)[]= [];
  const startPage = 1;
  const endPage = totalPages;
 

  // 
  arr.push(startPage);

  if(totalPages <=5){
      for(let i=1;i<totalPages-1;i++){
          arr.push(i+1);
      }
  }

  else {
      if(currentPage <=3){
          for(let i=1;i<=currentPage;i++){
              arr.push(i+1);
          }
          if(currentPage !=endPage-1){
               arr.push("...")
          }
      }

      // end
      else if(currentPage <=endPage && currentPage > endPage-3){
          arr.push('...');
          console.log(currentPage,"current page in end")

          for(let i=currentPage-1 ;i<endPage;i++){
               arr.push(i);
          }
      }

      // middle

      if(currentPage > 3 && currentPage <= endPage-3 ){
          arr.push('...')
          const vec = [-1,0,1];
          for(let i=0;i<vec.length;i++){
              arr.push(currentPage+vec[i])
          }
          arr.push('...')
      }
  }

arr.push(endPage)

  return arr;





},[currentPage,totalPages])



const cangoLeft = ()=>{
     if(currentPage >1) handlePageChange(currentPage-1);
}

const canGoRight = ()=>{
     if(currentPage <totalPages) handlePageChange(currentPage+1);
}



  return (
    <div className='w-full h-full  flex items-center justify-center'>
      <div className='flex flex-col items-center gap-7'>
          <div className='h-auto p-4 flex flex-col gap-3  mt-10 w-[500px] rounded-xl bg-green-500'>
         {data.map((item,ix)=>{
             return (
             <div className='border-black border py-2 px-1 ' key ={`${item.id}-${ix}`}>
              {item.title}
              </div>
             )
         })}
       </div>

      <div className="flex items-center gap-5 justify-center">
        <button onClick={cangoLeft} className={`bg-gray-400 p-1 rounded-xl ${currentPage >1?'bg-red-300':'bg-gray-500'}`}>{"<"}</button>
  {pagesTemp.map((item, index) => (
    <button
      key={index}
      disabled={item === "..."}
      onClick={() => typeof item === "number" && handlePageChange(item)}
      className={`px-3 py-1 border rounded 
        ${currentPage === item ? "bg-blue-800 text-white" : ""}`}
    >
      {item}
    </button>
  ))}
   <button onClick={canGoRight} className={`bg-gray-400 p-1 rounded-xl ${currentPage <totalPages?'bg-red-300':'bg-gray-500'}`}>{">"}</button>
</div>
      </div>
     

    </div>
  )
}

export default Pagination