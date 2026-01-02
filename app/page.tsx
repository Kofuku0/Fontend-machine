import Image from "next/image";


import InfiniteScroll from "@/frontend-machine/components/infinite-scroll";
import VirtualisedList from "@/frontend-machine/components/virtualised-list";
export default function HomePage() {
  return (
     <div>
      {/* <InfiniteScroll /> */}
      <VirtualisedList />
     </div>
  );
}
