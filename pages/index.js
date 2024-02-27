import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [shibaImages, setShibaImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.style.display = 'flex';
    document.documentElement.style.justifyContent = 'center';
    document.documentElement.style.alignItems = 'center';
    document.documentElement.style.minHeight = '100vh';
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Pokemon data
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
      setPokemonData(pokemonResponse.data);
      
      // Fetch Shiba Inu images
      const shibaResponse = await axios.get('https://shibe.online/api/shibes?count=6&urls=true&      httpsUrls=true');
       setShibaImages(shibaResponse.data); 

      setError('');
    } catch (err) {
      setPokemonData(null);
      setShibaImages([]);
      setError('Failed to fetch data.');
    }
  };

  return (
    <div>
      <h1>PokeShiba!!!</h1>
      <h2>↓ ここに図鑑番号を記入(最新の1025番目まで対応)</h2>
      <input
        type="number"
        placeholder="Enter Pokemon number"
        value={pokemonNumber}
        onChange={(e) => setPokemonNumber(e.target.value)}
      />
      <button onClick={fetchData}>Get Data</button>
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} 
            style={{width: '200px' }}/>
        </div>
      )}
    {shibaImages.length > 0 && (
        <div>
          {shibaImages.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Shiba Inu ${index + 1}`} width='auto' height='500'/>
          ))}
        </div>
      )}
    </div>
  );
}
