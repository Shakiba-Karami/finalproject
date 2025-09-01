import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'




import Home from '@/pages/Home';
import List from '@/pages/List';
import NotFound from '@/pages/NotFound';
import Item from '@/pages/Item';
// import './App.css'

function App() {

  return (
    <>
    <Provider store = {store}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/list' element = {<List />}/>
        <Route path='/list/genre/:filterValue' element = {<List />}/>
        <Route path='/item/:movieId' element = {<Item />}/>
        <Route path='*' element = {<NotFound />}/>
      </Routes>
    </Provider>
    </>
  )
}

export default App
