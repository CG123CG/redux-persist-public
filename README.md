# Course
https://www.udemy.com/course/the-complete-redux-bootcamp-build-4-hands-on-projects/

# NEW Learned
A - In case of Reducer1 and rootReducer, useSelector need to be pointed to the Reducer containing the STORE data

B - Persist Storage


## Basic App setup
1. Create setup as below for a Todo App. npm installs below
```
npm i redux react-redux redux-persist 
```

2. /components/Addtask
Collects Tasks from the user and invokes dispatch() when button is clicked
```
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
```


3. /components/Todolist
Displays the Todos from the STORE
```
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
```

4. /reducers/rootReducer
```
import { combineReducers } from "redux"
import taskReducer from './taskReducer'

export default combineReducers({
    taskReducer: taskReducer
})
```

5. /reducers/taskReducer
```
const initialData = {
    storeTasks: ['SavedTask-1', 'SavedTask-2']
}

function taskReducer(state = initialData, action) {
    let newState
    switch (action.type) {
        case 'ADD_TASK':
            newState = {
                ...state,
                storeTasks: [...state.storeTasks, action.payload]
            }
            break
        default:
            return state
    }
    return newState
}

export default taskReducer
```


6. /store/configureStore
```
import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'

function configureStore() {
    return createStore(
        rootReducer
    )
}

export default configureStore
```

7. App.js
```
import './App.css'
import Todolist from './components/Todolist'
import Addtask from './components/Addtask'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

function App() {

  const store = configureStore()

  return (
    <div className="App">
      <Provider store={store}>
        <Todolist />
        <Addtask />
      </Provider>
    </div>
  )
}

export default App
```

## Persist
8. In App, import following. PersistGate connects Redux/Persist to React-App
```
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
```

9. In App, remove below
```
const store = configureStore()
```

10. In App, add below, configuration file
```
const persistConfig = {
    key: 'root',
    storage
  }
```

11. Create a Reducer using persistReducer npm package, as cannot use rootReducer alone here
```
import rootReducer from './reducers/rootReducer'
  //Create a persist Reducer
  const persistReducerApp = persistReducer(persistConfig, rootReducer)
```

12. Create a Store for persist
```
import { createStore } from 'redux'
  //Create a persist Store
  const store = createStore(persistReducerApp)
```

13. Create a persistor for the store
```
const persistor = persistStore(store)
```

14. Enable persist storage for Child Components by wrapping them in ```<PersistGate>``` and providing persistor prop
```
return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Todolist />
          <Addtask />
        </ PersistGate>
      </Provider>
    </div>
  )
```
