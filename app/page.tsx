'use client';
import React from "react";
// import Image from "next/image";
// import InfiniteScroll from "@/frontend-machine/components/infinite-scroll";
// import VirtualisedList from "@/frontend-machine/components/virtualised-list";
// import Pagination from "@/frontend-machine/components/pagination";
// import ProgressBar from "@/frontend-machine/components/progress-bar";
// import DebounceComponent from "@/frontend-machine/components/debounce";
import Modal from "@/frontend-machine/components/modal";
export default function HomePage() {
  const [open,setOpen] = React.useState(false);
  return (
     <div>
      {/* <InfiniteScroll /> */}
      {/* <VirtualisedList /> */}
      {/* <Pagination /> */}
      {/* <div className="flex flex-col items-center justify-center gap-5">
      <ProgressBar value={9} outofValue={10}  />
      <ProgressBar loader={true}  />
      </div> */}
   {/* <DebounceComponent /> */}
   <button onClick={() => setOpen(true)}>Open Modal</button>
   <Modal open={open} onClose={() => setOpen(false)} />
   
     </div>
  );
}
