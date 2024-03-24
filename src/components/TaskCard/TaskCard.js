import React from 'react'
import './TaskCard.css'
import deleteImg from "./delete-icon.png"


function TaskCard({title,category,delFunction,index}) {
  return (
    <div className='task-card'>
        <h2 className='tasks-title'>{title}</h2>
        <span className='task-category'>{category}</span>
        <img src={deleteImg} alt='delete' className='delete-icon' 
        onClick={()=>{
        delFunction(index)
        }}/>
    </div>
  )
}

export default TaskCard