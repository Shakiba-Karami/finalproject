import { Route, Routes } from 'react-router-dom';
import { useReducer } from 'react'

import { ListContext } from './context/ListContext';
import { ListReducer, initialState }  from '@/reducers/ListReducer';

import Home from '@/pages/Home';
import List from '@/pages/List';
import NotFound from '@/pages/NotFound';
import Item from '@/pages/Item';
// import './App.css'

function App() {
  const [list, dispatch] = useReducer(ListReducer, initialState)

  return (
    <>
    <ListContext.Provider value={{list, dispatch}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/list' element = {<List />}/>
        <Route path='/item' element = {<Item />}/>
        <Route path='*' element = {<NotFound />}/>
      </Routes>
    </ListContext.Provider>
    </>
  )
}

export default App
