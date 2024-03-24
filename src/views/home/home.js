import React, { useState ,useEffect } from 'react'
import './home.css'
import addIcon from './add-icon.png'
import TaskCard from '../../components/TaskCard/TaskCard'

function Home() {

   const[tasks,setTasks]=useState([]);
   const[newTask,setNewTask]= useState('');
   const[error,setError]=useState('');
   const[category,setCategory]=useState("");

   const saveTasksToLS =(tasksToSave)=>{
    localStorage.setItem('tasks',JSON.stringify(tasksToSave));
   }


   const validateNewTask =()=>{
    if(newTask === ''){
        setError('please enter a task')
        return false;
    }
    else if(newTask.length < 5){
        setError('Task should be at least 5 characters long')
        return false;
    }
    else{
        setError('')
        return true;
    }

   }

   const addTask =()=>{
    const validationResult=validateNewTask();
    if(!validationResult) return;
    
    const newTasks =[
        {
            title:newTask,
            category:category,
        },
        ...tasks
    ]

    saveTasksToLS(newTasks);

    setTasks(newTasks);
    setNewTask('');

   }

   const deleteTask=(index)=>{
    const newTask =tasks;
    newTask.splice(index,1);
    setTasks([...newTask]);

    saveTasksToLS(newTask);
   }


   useEffect(()=>{
    const tasks = localStorage.getItem('tasks');
    if(tasks){
        setTasks(JSON.parse(tasks))
    }
 },[])


  return (
    <div>
        <h1 class="title">ToDo App </h1>

        <form>

            {/* div for inputbox */}
            <div class="input-container">
            <input type='input' class="input-box" placeholder='Enter the tast here' value={newTask} onChange={(e)=>{setNewTask(e.target.value)}}></input>
            

            <select className='category' 
            value={category} 
            onChange={(e)=>{
                setCategory(e.target.value)
            }}>
                <option>Category</option>
                <option value='🔝High'>High🔝</option>
                <option value='🔉Medium '>Medium🔉</option>
                <option value='👇Low '>Low 👇</option>
                <option value='👎Lowest '>Lowest 👎</option>
            </select>

            <img src={addIcon} alt="Add" className='Add-icon' onClick={addTask}></img>
            </div>


             {/* div for tasks */}
            <p className='error-massage'>{error}</p>
            <div className='taskbar-container'>
                {
                    tasks.map((tasks,i)=>{
                        const {title,category}=tasks;
                        return(<TaskCard 
                            title={title}
                            category={category}
                            key={i}
                            delFunction={deleteTask}
                            index={i}/>)
                        }
                    )
                    
                };
            </div> 

        </form>

    </div>
  )
}

export default Home




