import React from 'react'
import { useSelector } from 'react-redux'


export default function Todolist() {
    //MUST USE store.taskReducer.storeTasks, ELSE ERROR, CAZ MULTIPLE REDUCERS
    const tasks = useSelector(store => store.taskReducer.storeTasks)
    const eachtask = tasks.map((todo) => {
        return <h2 key={tasks.indexOf(todo)}>{todo}</h2>
    })

    return (
        <div>
            <h1>Display Todos</h1>
            {eachtask}
        </div>
    )
}
