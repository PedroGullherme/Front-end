import { useState } from "react";
import coracaoVazio from '../../assets/images/coracao-vazio.png';
import coracaoVermelho from '../../assets/images/coracao-vermelho.png';
import axios from "axios";
import './index.css'

function ListItem({ titulo, id, genero, imagemCapa, setLivroList }) {

  const [isFavorit, setIsFavorit] = useState(false);

  const handleClick = () => {
    setIsFavorit(!isFavorit);
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/livros/${id}`);
    const response = await axios.get('http://localhost:3001/livros');
    setLivroList(response.data)
  }

  return (
    <>
      <li key={id}>
        <span>{titulo} - {genero}</span>
        <br />
        <img className="imgLivro" src= {imagemCapa}/>
        <br />
        <button type="button" onClick={handleDelete}>Deletar</button>
        <button type="button" onClick={handleClick}>{isFavorit ? 'Desfavoritar' : 'Favoritar'}</button>
      <img className="imCoracao" src={isFavorit ? coracaoVermelho : coracaoVazio} width={'30px'} alt="coração" />
      </li>
    </>
  )
}

export default ListItem;
