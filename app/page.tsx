'use client';
import React,{useState,useEffect,useRef} from "react";
// import Image from "next/image";
// import InfiniteScroll from "@/frontend-machine/components/infinite-scroll";
// import VirtualisedList from "@/frontend-machine/components/virtualised-list";
// import Pagination from "@/frontend-machine/components/pagination";
// import ProgressBar from "@/frontend-machine/components/progress-bar";
// import DebounceComponent from "@/frontend-machine/components/debounce";
// import Modal from "@/frontend-machine/components/modal";
// import Form from '@/frontend-machine/components/form';
// import OTP from "@/frontend-machine/components/otp";
// import Accordion from "@/frontend-machine/components/accordian";
// import Tabs from "@/frontend-machine/components/tabs";
// import DataTable from "@/frontend-machine/components/data-table";
// import AccordianII from "@/frontend-machine/components/accordian-ii";
// import AccordionIII from "@/frontend-machine/components/accordian-iii";
import ProgressDemo from "@/frontend-machine/components/progress-bar";
import Clock from '@/frontend-machine/components/clock'
import ProgressBarGenerator from '@/frontend-machine/components/progress-bars';
// import AutoComplete from "@/frontend-machine/components/practise-component/autocomplete";
import Pagination from "@/frontend-machine/components/practise-component/pagination";
export default function HomePage() {
//   const [open,setOpen] = React.useState(false);


// for pratise pagination 
const [currentPage,setCurrentPage] = useState(1);
const [data,setData] = useState<any[]>([]);
const totalCountRef = useRef<number>(0);
const limit = 6;
const handlePageChange = (page:number)=>{
      setCurrentPage(page);
}

useEffect(()=>{

  const fetchData = async()=>{
      try{
      const res =await fetch(`https://dummyjson.com/products?page=${currentPage}&limit=${limit}`);
      const data = await  res.json();
      setData(data.products);
      totalCountRef.current = data.total;

    }catch(err){
       console.log(err,"errror")
    }
  }

  fetchData();
    
},[currentPage]);

  return (
     <div>
      {/* <InfiniteScroll /> */}
      {/* <VirtualisedList /> */}
      {/* <Pagination /> */}
      {/* <div className="flex flex-col items-center justify-center gap-5">
      <ProgressBar value={9} outofValue={10}  />
      <ProgressBar loader={true}  />
      </div> */}
      {/* <ProgressDemo /> */}
   {/* <DebounceComponent /> */}
   {/* <button onClick={() => setOpen(true)}>Open Modal</button>
   <Modal open={open} onClose={() => setOpen(false)} /> */}
     {/* <OTP/> */}
  

     {/* <Form/> */}
 

      {/* <Tabs
        items={[
          {
            value: 'html',
            label: 'HTML',
            panel:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            label: 'CSS',
            panel:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            label: 'JavaScript',
            panel:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          },
        ]}
      /> */}
      {/* <DataTable/> */}
    {/* <AccordianII 
       sections = {[{
        title: 'HTML',
        value :'html',
        content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
       },{
        title: 'CSS',
        value :'css',
        content:  'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
       },{
        title: 'JavaScript',
        value :'javascript',
        content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
       }]}
    /> */}
       {/* <AccordionIII
       sections = {[{
        title: 'HTML',
        value :'html',
        content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
       },{
        title: 'CSS',
        value :'css',
        content:  'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
       },{
        title: 'JavaScript',
        value :'javascript',
        content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
       }]}
    /> */}

    {/* <Clock/> */}
    {/* <ProgressBarGenerator/> */}
    {/* <AutoComplete/> */}
    <Pagination data= {data} totalCount = {totalCountRef.current} currentPage={currentPage} windowSize={limit} handlePageChange={handlePageChange}/>
     </div>
  );
}
