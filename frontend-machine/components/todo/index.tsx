


import { useState } from "react";
let id =0;


const INITIAL_TASKS = [
       {id:id++,label:'Walk the dog'},
       {id:id++,label:'Water the plants'},
       {id:id++,label:'Wash the dishes'}
]



export default function Todo(){
      const [tasks,setTasks] = useState(INITIAL_TASKS);
      const [newTask,setNewTask] = useState('');

      return(
          <div className='text-black p-10'>
              <h1>Todo List</h1>
              <div>
                <input 
                aria-label = 'Add new task'
                type='text'
                className="border py-2 px-6 m-2 rounded-xl"
                placeholder = 'Add you task'
                value = {newTask}
                onChange = {(event)=>{
                      setNewTask(event.target.value)

                }}/>

                <div>
                    <button
                     className="border px-6 py-2 m-2 rounded-xl items-center justify-center"
                    onClick = {()=>{
                          setTasks((prev)=>{
                              return prev.concat({
                                id:id++,
                                label:newTask.trim()
                              })
                          })
                          setNewTask('');
                    }}
                    >
                        Submit
                    </button>
                </div>

                <ul>
                    {tasks.map(({id,label})=>(
                            <li key ={id}>
                                 <span>{label}</span>
                                 <button className="bg-red-600 px-6 py-2 rounded-xl ml-2 mb-2" onClick={()=>{
                                      setTasks(tasks.filter((task)=>task.id!==id))
                                 }}>
                                    Delete
                                 </button>
                            </li>
                    ))}
                </ul>
              </div>
          </div>
      )

}