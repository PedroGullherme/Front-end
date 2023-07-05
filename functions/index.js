const fetchPokemonList = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    setPokemonList(data.results);
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
  }
};

fetchPokemonList();


const fetchPokemonList = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    setPokemonList(response.data.results);
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
  }
};

fetchPokemonList();

const createUser = async () => {
  try {
    const response = await axios.post('https://reqres.in/api/users', {
      name: 'John Doe',
      job: 'Developer',
    });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};