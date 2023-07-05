import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const AddLivros = () => {
  const [livros, setLivros] = useState([]);
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    imagemCapa: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchLivros = async () => {
    const response = await axios.get('http://localhost:3001/livros');
    setLivros(response.data);
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleChange = (e) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/livros/${editId}`, livro);
        setEditMode(false);
        setEditId('');
      } else {
        await axios.post('http://localhost:3001/livros', livro);
      }
      fetchLivros();
      setLivro({ titulo: '', autor: '', genero: '', imagemCapa: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, titulo, autor, genero, imagemCapa) => {
    setEditMode(true);
    setEditId(id);
    setLivro({ titulo, autor, genero, imagemCapa });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Livros</h1>
      <form onSubmit={handleSubmit}>
        <label className='titulo'>Título</label>
        <input
          className='inputTitulo'
          type="text"
          name="titulo"
          value={livro.titulo}
          onChange={handleChange}
        />
        <label className='autor'>Autor</label>
        <input
          className='inputAutor'
          type="text"
          name="autor"
          value={livro.autor}
          onChange={handleChange}
        />
        <label className='genero'>Gênero</label>
        <input
          className='inputGenero'
          type="text"
          name="genero"
          value={livro.genero}
          onChange={handleChange}
        />
        <label className='imagemCapa'>Imagem da Capa</label>
        <input
          className='inputImagemCapa'
          type="text"
          name="imagemCapa"
          value={livro.imagemCapa}
          onChange={handleChange}
        />
        <button type="submit">
          {editMode ? 'Atualizar Livro' : 'Adicionar Livro'}
        </button>
      </form>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            <h3>{livro.titulo}</h3>
            <p>Autor: {livro.autor}</p>
            <p>Gênero: {livro.genero}</p>
            <img className="imgCapa" src={livro.imagemCapa} alt={livro.titulo} />
            <br></br>
            <button onClick={() => handleEdit(livro.id, livro.titulo, livro.autor, livro.genero, livro.imagemCapa)}>
              Editar
            </button>
            <button onClick={() => handleDelete(livro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddLivros;
