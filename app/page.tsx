import Image from "next/image";


import InfiniteScroll from "@/frontend-machine/components/infinite-scroll";
import VirtualisedList from "@/frontend-machine/components/virtualised-list";
import Pagination from "@/frontend-machine/components/pagination";
export default function HomePage() {
  return (
     <div>
      {/* <InfiniteScroll /> */}
      {/* <VirtualisedList /> */}
      <Pagination />
     </div>
  );
}
