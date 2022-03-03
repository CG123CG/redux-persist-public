import './App.css'
import Todolist from './components/Todolist'
import Addtask from './components/Addtask'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './reducers/rootReducer'
import { createStore } from 'redux'


function App() {
  //Removed for Persist
  //const store = configureStore()

  //Added for Persist, configuration variable
  const persistConfig = {
    key: 'root',
    storage
  }

  //Create a persist Reducer
  const persistReducerApp = persistReducer(persistConfig, rootReducer)

  //Create a persist Store
  const store = createStore(persistReducerApp)

  //Create a persistor for the store
  const persistor = persistStore(store)

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
}

export default App
