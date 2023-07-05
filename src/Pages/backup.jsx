import { useState, useEffect } from 'react';
import './App.css'
import ListItem from './components/ListItem';
import Subtitle from './components/Subtitle';
import Loading from './components/Loading';
import axios from 'axios';

function App() {
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teams');
        setTeamList(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };
    
    fetchPokemonList();
  }, []);

  const [count, setCount] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [teamLocal, setTeamLocal] = useState('');
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const handle = (target) => {
    setError('')
    const {value, name} = target;
    setForm({
      ...form,
      [name]: value
    })
    console.log(form)
  }

  const addTeam = async () => {
    try {
      await axios.post('http://localhost:3001/teams', form);
      const response = await axios.get('http://localhost:3001/teams');
      setTeamList(response.data)
      setForm({})
    } catch (error) {
      setError('Erro ao criar');
      console.error('Error creating team:', error);
      setForm({})
    }
  }

  return (
    <>
      <h1>Página de futebol</h1>
      <Subtitle subtitle="Times" />
      <ul>
        {
          loading ?
          <Loading /> :
          teamList.map((time) => <ListItem team={time.name} id={time.id} local={time.local} setTeamList={setTeamList} />)
        }
      </ul>
      <form>
        Nome: 
        <input 
          type='text' 
          min={3} 
          max={40}
          name='name' 
          placeholder='Digite o nome do time' 
          onChange={(e) => handle(e.target)} 
        />
        Local:
        <input 
          type='text' 
          min={3} 
          max={40}
          name='local'
          placeholder='Digite o local do time' 
          onChange={(e) => handle(e.target)} 
        /> 
        {error ? error : ''}
        <button type='button' onClick={addTeam}>Adicionar</button>
      </form>
      <span>{teamName}</span>
      <span>{teamLocal}</span>
  <Subtitle subtitle="Torcedores"/> 
      
      <button type='button' onClick={() => setCount(count + 1)}>Contador: {count}</button>
       
      <button type="button" >Apagar</button>
    </>
  )
}

export default App
