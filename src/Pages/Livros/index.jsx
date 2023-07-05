import { useState, useEffect } from 'react';
import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';
import axios from 'axios';

function Livros() {
  const [LivroList, setLivroList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivroList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/livros');
        setLivroList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };
    
    fetchLivroList();
  }, []);

  return (
    <div className="card">
      <h1>Livros</h1>
      <div className="scrollable-list">
        <ul>
          {loading ? (
            <Loading />
          ) : (
            LivroList.map((livro) => (
              <ListItem
                key={livro.id}
                titulo={livro.titulo}
                autor={livro.autor}
                genero={livro.genero}
                imagemCapa={livro.imagemCapa}
                setLivroList={setLivroList}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Livros;
