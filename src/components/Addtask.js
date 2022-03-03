import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


export default function Addtask() {
    const [aTask, setATask] = useState('')
    const dispatch = useDispatch()

    const dispatchTask = () => {
        dispatch({
            type: 'ADD_TASK',
            payload: aTask
        })
    }

    return (
        <div>
            <input
                type="text"
                placeholder="enter a task"
                onChange={(e) => setATask(e.target.value)}
                value={aTask}
            >
            </input>
            <button onClick={dispatchTask}>Add Task to Store</button>
        </div>
    )
}
