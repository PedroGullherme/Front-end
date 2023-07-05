import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Paginas = () => {
  const [paginas, setPaginas] = useState([]);
  const [pagina, setPagina] = useState({
    numPagina: '',
    imagem: '',
    idCapitulo: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchPaginas = async () => {
    const response = await axios.get('http://localhost:3001/paginas');
    setPaginas(response.data);
  };

  useEffect(() => {
    fetchPaginas();
  }, []);

  const handleChange = (e) => {
    setPagina({ ...pagina, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/paginas/${editId}`, pagina);
        setEditMode(false);
        setEditId('');
      } else {
        await axios.post('http://localhost:3001/paginas', pagina);
      }
      fetchPaginas();
      setPagina({ numPagina: '', imagem: '', idCapitulo: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, numPagina, imagem, idCapitulo) => {
    setEditMode(true);
    setEditId(id);
    setPagina({ numPagina, imagem, idCapitulo });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/paginas/${id}`);
      fetchPaginas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Páginas</h1>
      <form onSubmit={handleSubmit}>
        <label>Número da Página</label>
        <input
          type="text"
          name="numPagina"
          value={pagina.numPagina}
          onChange={handleChange}
        />
        <label>Imagem</label>
        <input
          type="text"
          name="imagem"
          value={pagina.imagem}
          onChange={handleChange}
        />
        <label>ID do Capítulo</label>
        <input
          type="text"
          name="idCapitulo"
          value={pagina.idCapitulo}
          onChange={handleChange}
        />
        <button type="submit">
          {editMode ? 'Atualizar Página' : 'Adicionar Página'}
        </button>
      </form>
      <ul>
        {paginas.map((pagina) => (
          <li key={pagina.id}>
            <h3>{pagina.numPagina}</h3>
            <p>Imagem: {pagina.imagem}</p>
            <p>ID do Capítulo: {pagina.idCapitulo}</p>
            <button onClick={() => handleEdit(pagina.id, pagina.numPagina, pagina.imagem, pagina.idCapitulo)}>
              Editar
            </button>
            <button onClick={() => handleDelete(pagina.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginas;
