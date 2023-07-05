import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import AddLivro from './Pages/AddLivro'
import AddCapitulos from './Pages/AddCapitulos'
import AddPaginas from './Pages/AddPaginas'
import Header from './components/Header'
import TeamDetails from './Pages/TeamDetails'
import Livros from './Pages/Livros'
import './App.css'

export function App() {
  return (
      <>
      <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/livros" element={<Livros/>}/>
      <Route path="/livros/add" element={<AddLivro/>}/>
      <Route path="/capitulos/add" element={<AddCapitulos/>}/>
      <Route path="/paginas/add" element={<AddPaginas/>}/>      
      <Route path='/teams/details/:id' element= {<TeamDetails/>}/>
      <Route path= '/*'element = {<Home/>}/>
    </Routes>
    </>
  )
}

export default App