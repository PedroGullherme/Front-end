import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Capitulos = () => {
  const [capitulos, setCapitulos] = useState([]);
  const [capitulo, setCapitulo] = useState({
    titulo: '',
    numCapitulo: '',
    idLivro: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchCapitulos = async () => {
    const response = await axios.get('http://localhost:3001/capitulos');
    setCapitulos(response.data);
  };

  useEffect(() => {
    fetchCapitulos();
  }, []);

  const handleChange = (e) => {
    setCapitulo({ ...capitulo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/capitulos/${editId}`, capitulo);
        setEditMode(false);
        setEditId('');
      } else {
        await axios.post('http://localhost:3001/capitulos', capitulo);
      }
      fetchCapitulos();
      setCapitulo({ titulo: '', numCapitulo: '', idLivro: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, titulo, numCapitulo, idLivro) => {
    setEditMode(true);
    setEditId(id);
    setCapitulo({ titulo, numCapitulo, idLivro });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/capitulos/${id}`);
      fetchCapitulos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Capítulos</h1>
      <form onSubmit={handleSubmit}>
        <label>Título do Capítulo</label>
        <input
          type="text"
          name="titulo"
          value={capitulo.titulo}
          onChange={handleChange}
        />
        <label>Número do Capítulo</label>
        <input
          type="text"
          name="numCapitulo"
          value={capitulo.numCapitulo}
          onChange={handleChange}
        />
        <label>ID do Livro</label>
        <input
          type="text"
          name="idLivro"
          value={capitulo.idLivro}
          onChange={handleChange}
        />
        <button type="submit">
          {editMode ? 'Atualizar Capítulo' : 'Adicionar Capítulo'}
        </button>
      </form>
      <ul>
        {capitulos.map((capitulo) => (
          <li key={capitulo.id}>
            <h3>{capitulo.titulo}</h3>
            <p>Número do Capítulo: {capitulo.numCapitulo}</p>
            <p>ID do Livro: {capitulo.idLivro}</p>
            <button onClick={() => handleEdit(capitulo.id, capitulo.titulo, capitulo.numCapitulo, capitulo.idLivro)}>
              Editar
            </button>
            <button onClick={() => handleDelete(capitulo.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Capitulos;
