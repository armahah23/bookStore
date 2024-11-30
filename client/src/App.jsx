import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import DeleteBooks from './pages/DeleteBooks';
import EditBooks from './pages/EditBooks';
import ShowBook from './pages/ShowBook';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/createbook' element={<CreateBooks />} />
      <Route path='/deletebook' element={<DeleteBooks />} />
      <Route path='/editbook' element={<EditBooks />} />
      <Route path='/showbooks' element={<ShowBook />} />
    </Routes>
  )
}

export default App
