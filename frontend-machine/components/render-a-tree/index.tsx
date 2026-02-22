type TreeNode = {
  name: string;
  children: TreeNode[];
};

const data: TreeNode = {
  name: "root",
  children: [
    {
      name: "A",
      children: [
        {
          name: "A1",
          children: [
            { name: "A1a", children: [] },
            { name: "A1b", children: [] },
          ],
        },
        {
          name: "A2",
          children: [
            {
              name: "A2a",
              children: [
                { name: "A2a-i", children: [] },
                { name: "A2a-ii", children: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "B",
      children: [
        {
          name: "B1",
          children: [
            { name: "B1a", children: [] },
            { name: "B1b", children: [] },
            {
              name: "B1c",
              children: [
                { name: "B1c-i", children: [] },
                { name: "B1c-ii", children: [] },
              ],
            },
          ],
        },
        { name: "B2", children: [] },
      ],
    },
    {
      name: "C",
      children: [
        {
          name: "C1",
          children: [
            {
              name: "C1a",
              children: [
                { name: "C1a-i", children: [ { name: "C1a-iii", children: [] },] },
                { name: "C1a-ii", children: [] },
                { name: "C1a-iii", children: [] },
              ],
            },
          ],
        },
        {
          name: "C2",
          children: [
            { name: "C2a", children: [] },
            { name: "C2b", children: [] },
          ],
        },
      ],
    },
  ],
};



const RenderTree = ({data}:any)=>{
    

    // check wheathes data is empty or not
    // if empty return;

 const isEmpty = Object.keys(data).length === 0;
 if(isEmpty){
      return;
 }
    const hasChildren = data?.children.length>0;

    return (
          <div key ={data.name} className="min-h-10 h-auto  flex flex-col justify-center relative items-start pl-5  bg-blue-200 text-white   rounded-xl">
            {data.name}
           {/* {hasChildren && <div className="absolute right-5 top-0">V</div>} */}
               {hasChildren && (
                      <div className=" pl-4 mt-4">
                    {data.children.map((data:any)=>{
                          return <RenderTree key = {data.name} data = {data}/>
                    })}
              </div>
               )}
              
               

             
          </div>
    )
}



export default function RenderATree(){
       return (
        <div className="relative m-10 w-auto overflow-hidden">
              <RenderTree data = {data}/>
        </div>
        
       )
}