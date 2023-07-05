import { Link } from 'react-router-dom'
import './index.css';

function Header(){
    return (
        <nav className="header-nav">
            <Link to='/'>Home</Link>
            <Link to='/livros'>Livros</Link>
            <Link to= '/livros/add'>Adicionar Livro</Link>
            <Link to= '/capitulos/add'>Adicionar Capitulo</Link>
            <Link to= '/paginas/add'>Adicionar Pagina</Link>
        </nav>
    )
}

export default Header;