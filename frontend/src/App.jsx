import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx';
import CreateBooks from './pages/CreateBooks.jsx';
import ShowBooks from './pages/ShowBooks.jsx';
import DeleteBooks from './pages/DeleteBooks.jsx';
import EditBooks from './pages/EditBooks.jsx';



const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/books/create' element={<CreateBooks/>}/>
          <Route path='books/details/:id' element={<ShowBooks/>}/>
           <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
            <Route path='/books/edit/:id' element={<EditBooks/>}/>
    </Routes>
  )
}

export default App
